import streamlit as st
import pandas as pd
from sqlalchemy import create_engine
import time

# Connect to the Postgres container
# Connection string: postgresql://user:password@host:port/database
db_url = "postgresql://n8n:n8n@postgres:5432/n8n"
engine = create_engine(db_url)

st.set_page_config(page_title="MarketMind Hive", layout="wide")
st.title("🧠 MarketMind Hive: Live Operations")

# Metrics Section
col1, col2, col3, col4 = st.columns(4)

try:
    # Fetch Data
    df = pd.read_sql("SELECT * FROM campaign_logs ORDER BY created_at DESC LIMIT 100", engine)

    if not df.empty:
        total = len(df)
        pauses = len(df[df['decision'] == 'PAUSE'])
        scales = len(df[df['decision'] == 'SCALE'])
        skipped = len(df[df['decision'] == 'SKIPPED'])

        col1.metric("Total Interventions", total)
        col2.metric("🛑 Paused (Safety)", pauses)
        col3.metric("📈 Scaled (Growth)", scales)
        col4.metric("🔒 Redis Locks", skipped)

        # Charts
        st.subheader("Decision Distribution")
        st.bar_chart(df['decision'].value_counts())

        # Data Table
        st.subheader("Live Audit Log (RAG & LangGraph Evidence)")
        st.dataframe(df[['created_at', 'campaign_id', 'decision', 'reason']])
    else:
        st.info("Waiting for n8n to send data...")

except Exception as e:
    st.error(f"Waiting for Database Connection... ({e})")

if st.button('🔄 Refresh Data'):
    st.rerun()