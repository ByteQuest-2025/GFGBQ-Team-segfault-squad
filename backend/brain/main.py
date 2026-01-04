from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import redis
import os
import json
import uuid

# Initialize App & Redis
app = FastAPI(title="Digital Marketing Brain API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Try to connect to Redis (use 'redis' for Docker, 'localhost' for local dev)
redis_host = os.getenv('REDIS_HOST', 'localhost')
try:
    r = redis.Redis(host=redis_host, port=6379, decode_responses=True)
    r.ping()  # Test connection
except redis.ConnectionError:
    print(f"Warning: Could not connect to Redis at {redis_host}:6379. Running without Redis locks.")
    r = None

# In-memory storage (replace with database in production)
campaigns_db = {}
agents_db = {}
metrics_db = []
activities_db = []

# Data Models
class CampaignData(BaseModel):
    campaign_id: str
    cpa: float
    spend: float

class Campaign(BaseModel):
    id: str
    platform: str
    current_budget: float
    suggested_budget: Optional[float] = None
    roi: float
    impressions: int
    conversions: int
    cpa: float
    metadata: dict = {}
    created_at: str
    updated_at: str

class CampaignCreate(BaseModel):
    platform: str
    current_budget: float
    roi: float = 0.0
    impressions: int = 0
    conversions: int = 0
    cpa: float = 0.0
    metadata: dict = {}

class CampaignUpdate(BaseModel):
    platform: Optional[str] = None
    current_budget: Optional[float] = None
    suggested_budget: Optional[float] = None
    roi: Optional[float] = None
    impressions: Optional[int] = None
    conversions: Optional[int] = None
    cpa: Optional[float] = None
    metadata: Optional[dict] = None

class Agent(BaseModel):
    id: str
    name: str
    type: str
    icon: str
    confidence: float
    current_task: str
    progress: int
    mode: str  # 'auto' | 'semi-auto' | 'manual'
    status: str  # 'active' | 'idle' | 'processing'
    created_at: str
    updated_at: str

class AgentCreate(BaseModel):
    name: str
    type: str
    icon: str
    confidence: float = 0.0
    current_task: str = ""
    progress: int = 0
    mode: str = "auto"
    status: str = "idle"

class AgentUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    icon: Optional[str] = None
    confidence: Optional[float] = None
    current_task: Optional[str] = None
    progress: Optional[int] = None
    mode: Optional[str] = None
    status: Optional[str] = None

class Metric(BaseModel):
    id: str
    metric_type: str
    value: float
    metadata: dict = {}
    recorded_at: str
    created_at: str

class MetricCreate(BaseModel):
    metric_type: str
    value: float
    metadata: dict = {}

class Activity(BaseModel):
    id: str
    agent_id: str
    activity_type: str
    description: str
    metadata: dict = {}
    created_at: str

class ActivityCreate(BaseModel):
    agent_id: str
    activity_type: str
    description: str
    metadata: dict = {}

# Initialize with sample data
def init_sample_data():
    """Initialize with sample data for development"""
    if not campaigns_db:
        sample_campaigns = [
            {"id": "1", "platform": "Google Ads", "current_budget": 35000, "roi": 287, "impressions": 125000, "conversions": 850, "cpa": 45.5, "metadata": {}, "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "2", "platform": "Facebook", "current_budget": 28000, "roi": 198, "impressions": 98000, "conversions": 520, "cpa": 52.3, "metadata": {}, "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "3", "platform": "LinkedIn", "current_budget": 18000, "roi": 342, "impressions": 45000, "conversions": 380, "cpa": 28.7, "metadata": {}, "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "4", "platform": "Instagram", "current_budget": 12000, "roi": 156, "impressions": 75000, "conversions": 280, "cpa": 38.2, "metadata": {}, "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "5", "platform": "TikTok", "current_budget": 7000, "roi": 89, "impressions": 32000, "conversions": 120, "cpa": 55.1, "metadata": {}, "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
        ]
        for camp in sample_campaigns:
            campaigns_db[camp["id"]] = camp
    
    if not agents_db:
        sample_agents = [
            {"id": "1", "name": "User Behavior Agent", "type": "behavioral", "icon": "users", "confidence": 94, "current_task": "Analyzing session drop-off patterns", "progress": 75, "mode": "auto", "status": "active", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "2", "name": "Content Optimizer", "type": "content", "icon": "message", "confidence": 89, "current_task": "Testing headline variations", "progress": 62, "mode": "auto", "status": "processing", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "3", "name": "Conversion Agent", "type": "conversion", "icon": "target", "confidence": 96, "current_task": "Optimizing funnel progression", "progress": 88, "mode": "auto", "status": "active", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "4", "name": "ROI Analyzer", "type": "roi", "icon": "trending", "confidence": 91, "current_task": "Calculating attribution models", "progress": 45, "mode": "semi-auto", "status": "processing", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "5", "name": "Audience Intelligence", "type": "audience", "icon": "eye", "confidence": 87, "current_task": "Segmenting users", "progress": 91, "mode": "auto", "status": "active", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "6", "name": "Creative AI", "type": "creative", "icon": "brain", "confidence": 93, "current_task": "Generating ad creative variations", "progress": 70, "mode": "auto", "status": "active", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "7", "name": "Engagement AI", "type": "engagement", "icon": "zap", "confidence": 88, "current_task": "Optimizing send times", "progress": 55, "mode": "auto", "status": "active", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
            {"id": "8", "name": "Market Trends", "type": "market", "icon": "chart", "confidence": 85, "current_task": "Monitoring competitor activity", "progress": 38, "mode": "manual", "status": "idle", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat()},
        ]
        for agent in sample_agents:
            agents_db[agent["id"]] = agent

@app.get("/")
def health_check():
    # Initialize sample data on first health check if not already done
    if not campaigns_db or not agents_db:
        init_sample_data()
    return {"status": "Brain is active", "version": "1.0.0"}

@app.post("/analyze")
def analyze_campaign(data: CampaignData):
    # 1. CHECK LOCKS (The "Nervous System")
    if r:
        lock_key = f"lock:campaign:{data.campaign_id}"
        try:
            if r.exists(lock_key):
                return {
                    "campaign_id": data.campaign_id,
                    "decision": "skip",
                    "reason": "Campaign is locked/optimizing"
                }
            # 2. SET LOCK (Prevent other agents from interfering)
            r.set(lock_key, "processing", ex=60)  # Lock for 60 seconds
        except redis.RedisError:
            pass  # Continue without locks if Redis fails

    # 3. LOGIC (Simple Rule-Based for now, replace with LangGraph later)
    # "If CPA > $50, lower bid. If CPA < $30, raise bid."
    decision = "maintain"
    new_bid_factor = 1.0

    if data.cpa > 50.0:
        decision = "lower_bid"
        new_bid_factor = 0.85
    elif data.cpa < 30.0:
        decision = "raise_bid"
        new_bid_factor = 1.15

    # 4. RELEASE LOCK
    if r:
        try:
            lock_key = f"lock:campaign:{data.campaign_id}"
            r.delete(lock_key)
        except redis.RedisError:
            pass

    # 5. RETURN COMMAND TO N8N
    return {
        "campaign_id": data.campaign_id,
        "decision": decision,
        "suggested_action": {
            "type": "update_bid",
            "factor": new_bid_factor
        }
    }

# ==================== CAMPAIGNS ENDPOINTS ====================

@app.get("/campaigns", response_model=List[Campaign])
def get_campaigns():
    """Get all campaigns"""
    return list(campaigns_db.values())

@app.get("/campaigns/{campaign_id}", response_model=Campaign)
def get_campaign(campaign_id: str):
    """Get a specific campaign"""
    if campaign_id not in campaigns_db:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaigns_db[campaign_id]

@app.post("/campaigns", response_model=Campaign, status_code=201)
def create_campaign(campaign: CampaignCreate):
    """Create a new campaign"""
    campaign_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    new_campaign = {
        "id": campaign_id,
        "platform": campaign.platform,
        "current_budget": campaign.current_budget,
        "suggested_budget": campaign.suggested_budget,
        "roi": campaign.roi,
        "impressions": campaign.impressions,
        "conversions": campaign.conversions,
        "cpa": campaign.cpa,
        "metadata": campaign.metadata,
        "created_at": now,
        "updated_at": now
    }
    campaigns_db[campaign_id] = new_campaign
    return new_campaign

@app.put("/campaigns/{campaign_id}", response_model=Campaign)
def update_campaign(campaign_id: str, campaign_update: CampaignUpdate):
    """Update a campaign"""
    if campaign_id not in campaigns_db:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    existing = campaigns_db[campaign_id]
    update_data = campaign_update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        existing[key] = value
    
    existing["updated_at"] = datetime.now().isoformat()
    campaigns_db[campaign_id] = existing
    return existing

@app.delete("/campaigns/{campaign_id}", status_code=204)
def delete_campaign(campaign_id: str):
    """Delete a campaign"""
    if campaign_id not in campaigns_db:
        raise HTTPException(status_code=404, detail="Campaign not found")
    del campaigns_db[campaign_id]
    return None

# ==================== AGENTS ENDPOINTS ====================

@app.get("/agents", response_model=List[Agent])
def get_agents():
    """Get all agents"""
    return list(agents_db.values())

@app.get("/agents/{agent_id}", response_model=Agent)
def get_agent(agent_id: str):
    """Get a specific agent"""
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agents_db[agent_id]

@app.post("/agents", response_model=Agent, status_code=201)
def create_agent(agent: AgentCreate):
    """Create a new agent"""
    agent_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    new_agent = {
        "id": agent_id,
        "name": agent.name,
        "type": agent.type,
        "icon": agent.icon,
        "confidence": agent.confidence,
        "current_task": agent.current_task,
        "progress": agent.progress,
        "mode": agent.mode,
        "status": agent.status,
        "created_at": now,
        "updated_at": now
    }
    agents_db[agent_id] = new_agent
    return new_agent

@app.put("/agents/{agent_id}", response_model=Agent)
def update_agent(agent_id: str, agent_update: AgentUpdate):
    """Update an agent"""
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    existing = agents_db[agent_id]
    update_data = agent_update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        existing[key] = value
    
    existing["updated_at"] = datetime.now().isoformat()
    agents_db[agent_id] = existing
    return existing

@app.delete("/agents/{agent_id}", status_code=204)
def delete_agent(agent_id: str):
    """Delete an agent"""
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    del agents_db[agent_id]
    return None

# ==================== METRICS ENDPOINTS ====================

@app.get("/metrics", response_model=List[Metric])
def get_metrics(
    metric_type: Optional[str] = Query(None, description="Filter by metric type"),
    limit: int = Query(100, ge=1, le=1000, description="Limit number of results")
):
    """Get metrics, optionally filtered by type"""
    metrics = list(metrics_db)
    
    if metric_type:
        metrics = [m for m in metrics if m.get("metric_type") == metric_type]
    
    # Sort by recorded_at descending and limit
    metrics.sort(key=lambda x: x.get("recorded_at", ""), reverse=True)
    return metrics[:limit]

@app.post("/metrics", response_model=Metric, status_code=201)
def create_metric(metric: MetricCreate):
    """Create a new metric"""
    metric_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    new_metric = {
        "id": metric_id,
        "metric_type": metric.metric_type,
        "value": metric.value,
        "metadata": metric.metadata,
        "recorded_at": now,
        "created_at": now
    }
    metrics_db.append(new_metric)
    return new_metric

# ==================== ACTIVITIES ENDPOINTS ====================

@app.get("/activities", response_model=List[Activity])
def get_activities(
    agent_id: Optional[str] = Query(None, description="Filter by agent ID"),
    limit: int = Query(50, ge=1, le=1000, description="Limit number of results")
):
    """Get activities, optionally filtered by agent ID"""
    activities = list(activities_db)
    
    if agent_id:
        activities = [a for a in activities if a.get("agent_id") == agent_id]
    
    # Sort by created_at descending and limit
    activities.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return activities[:limit]

@app.post("/activities", response_model=Activity, status_code=201)
def create_activity(activity: ActivityCreate):
    """Create a new activity"""
    activity_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    new_activity = {
        "id": activity_id,
        "agent_id": activity.agent_id,
        "activity_type": activity.activity_type,
        "description": activity.description,
        "metadata": activity.metadata,
        "created_at": now
    }
    activities_db.append(new_activity)
    return new_activity