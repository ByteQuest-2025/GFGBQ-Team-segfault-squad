from fastapi import FastAPI
from pydantic import BaseModel
import redis
import os
import json
from typing import TypedDict

# LangGraph & LangChain Imports
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FakeEmbeddings 

app = FastAPI()

# --- 1. SETUP INFRASTRUCTURE ---
# Connect to internal Redis
r = redis.Redis(host='redis', port=6379, decode_responses=True)

# Connect to Groq (Free LLM)
llm = ChatGroq(temperature=0, model_name="llama-3.3-70b-versatile", groq_api_key=os.getenv("GROQ_API_KEY"))

# Setup RAG (ChromaDB with FakeEmbeddings for speed/free cost)
embeddings = FakeEmbeddings(size=4096)
vector_db = Chroma(persist_directory="./chroma_db", embedding_function=embeddings)

# Initialize Knowledge Base (One-Time Run)
if len(vector_db.get()['ids']) == 0:
    print("Initializing Knowledge Base...")
    vector_db.add_texts([
        "If CPA is above $50, PAUSE the campaign immediately.",
        "If CPA is below $30, SCALE the budget by 20%.",
        "If CPA is between $30 and $50, MAINTAIN and monitor.",
        "Never pause 'Brand Awareness' campaigns."
    ])

# --- 2. DEFINE GRAPH STATE ---
class AgentState(TypedDict):
    campaign_id: str
    campaign_name: str
    cpa: float
    spend: float
    decision: str
    reason: str
    rag_context: str
    is_locked: bool

# --- 3. DEFINE NODES (The Logic Steps) ---

def check_lock_node(state: AgentState):
    """Node 1: Check Redis Lock"""
    lock_key = f"lock:{state['campaign_id']}"
    if r.exists(lock_key):
        return {"is_locked": True, "decision": "SKIPPED", "reason": "Locked in Redis"}
    
    # Set lock for 10 seconds
    r.set(lock_key, "processing", ex=10)
    return {"is_locked": False}

def retrieve_rules_node(state: AgentState):
    """Node 2: Get RAG Context"""
    query = f"What should I do if CPA is ${state['cpa']}?"
    docs = vector_db.similarity_search(query, k=1)
    rule = docs[0].page_content if docs else "No rule found."
    return {"rag_context": rule}

def analyze_node(state: AgentState):
    """Node 3: Ask LLM"""
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an Ad Optimization Agent. Use the Context Rules strictly."),
        ("human", """
        Campaign: {name}
        CPA: ${cpa}
        Context Rules: "{context}"
        
        Output JSON ONLY: {{ "decision": "PAUSE" or "SCALE" or "MAINTAIN", "reason": "brief explanation" }}
        """)
    ])
    
    chain = prompt | llm
    response = chain.invoke({
        "name": state['campaign_name'],
        "cpa": state['cpa'],
        "context": state['rag_context']
    })
    
    try:
        result = json.loads(response.content)
        return {"decision": result['decision'], "reason": result['reason']}
    except:
        return {"decision": "ERROR", "reason": "JSON Parsing Failed"}

# --- 4. BUILD THE GRAPH ---

workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("check_lock", check_lock_node)
workflow.add_node("retrieve_rules", retrieve_rules_node)
workflow.add_node("analyze_data", analyze_node)

# Set Entry Point
workflow.set_entry_point("check_lock")

# Conditional Logic
def check_lock_condition(state):
    return "end" if state["is_locked"] else "continue"

workflow.add_conditional_edges(
    "check_lock",
    check_lock_condition,
    { "end": END, "continue": "retrieve_rules" }
)

workflow.add_edge("retrieve_rules", "analyze_data")
workflow.add_edge("analyze_data", END)

app_graph = workflow.compile()

# --- 5. API ENDPOINT ---

class RequestData(BaseModel):
    campaign_id: str
    cpa: float
    spend: float
    campaign_name: str = "Generic Campaign"

@app.post("/analyze")
def run_agent(data: RequestData):
    initial_state = {
        "campaign_id": data.campaign_id,
        "campaign_name": data.campaign_name,
        "cpa": data.cpa,
        "spend": data.spend,
        "decision": "PENDING",
        "reason": "",
        "rag_context": "",
        "is_locked": False
    }
    
    final_state = app_graph.invoke(initial_state)
    
    return {
        "campaign_id": final_state['campaign_id'],
        "decision": final_state['decision'],
        "reason": final_state['reason'],
        "rule_used": final_state['rag_context']
    }