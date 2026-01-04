import streamlit as st
import requests
import json
import pandas as pd

st.set_page_config(page_title="MarketMind Hive 2.0", layout="wide")
st.title("🧠 MarketMind Hive: Autonomous Ad Ops")

# Sidebar for manual testing
with st.sidebar:
    st.header("Simulate Data Stream")
    cpa = st.slider("Current CPA ($)", 10, 100, 45)
    spend = st.slider("Current Spend ($)", 100, 5000, 1200)
    
    if st.button("Inject Data Event"):
        payload = {
            "thread_id": "demo_session_1",
            "campaign_data": {"cpa": cpa, "spend": spend}
        }
        try:
            # Call your local API
            response = requests.post("http://localhost:8000/run", json=payload)
            st.session_state['last_decision'] = response.json()
            st.success("Event sent to Agent!")
        except Exception as e:
            st.error(f"Connection Error: {e}")

# Main Dashboard
col1, col2 = st.columns(2)

with col1:
    st.subheader("Live Agent State")
    if 'last_decision' in st.session_state:
        decision = st.session_state['last_decision']
        
        # Visual Decision Card
        if decision.get('action') == 'update_budget':
            st.warning(f"⚠️ ACTION: Update Budget")
            st.metric("New Amount", f"${decision.get('amount')}")
        else:
            st.info("✅ ACTION: Wait / Monitor")
            
        st.json(decision)
    else:
        st.write("Waiting for data stream...")

with col2:
    st.subheader("Performance Ticker")
    # Mock chart for demo visual
    chart_data = pd.DataFrame({
        'time': range(10),
        'ROAS': [2.1, 2.2, 2.1, 2.4, 2.8, 3.1, 3.0, 3.4, 3.6, 3.8]
    })
    st.line_chart(chart_data.set_index('time'))