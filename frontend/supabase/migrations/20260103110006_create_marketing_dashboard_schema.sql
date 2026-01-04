/*
  # AI Marketing Command Center Database Schema

  ## Overview
  This migration creates the core database structure for the AI Marketing Command Center,
  enabling persistence of agent data, metrics, campaigns, and activity logs.

  ## New Tables

  ### 1. `agents`
  Stores AI agent configuration and current state
  - `id` (uuid, primary key) - Unique identifier for each agent
  - `name` (text) - Agent display name (e.g., "User Behavior Agent")
  - `type` (text) - Agent type identifier (e.g., "behavioral", "content")
  - `icon` (text) - Icon identifier for UI display
  - `confidence` (numeric) - Current confidence score (0-100)
  - `current_task` (text) - Description of current task
  - `progress` (numeric) - Task progress percentage (0-100)
  - `mode` (text) - Operation mode: 'auto', 'semi-auto', or 'manual'
  - `status` (text) - Current status: 'active', 'idle', or 'processing'
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `metrics`
  Stores time-series metrics data for dashboard visualizations
  - `id` (uuid, primary key) - Unique identifier
  - `metric_type` (text) - Type of metric (e.g., "roi", "engagement", "conversion")
  - `value` (numeric) - Metric value
  - `metadata` (jsonb) - Additional metric data (trends, deltas, etc.)
  - `recorded_at` (timestamptz) - When the metric was recorded
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `campaigns`
  Stores campaign data and budget allocations
  - `id` (uuid, primary key) - Unique identifier
  - `platform` (text) - Platform name (e.g., "Google Ads", "Facebook")
  - `current_budget` (numeric) - Current allocated budget
  - `suggested_budget` (numeric) - AI-suggested budget
  - `roi` (numeric) - Return on investment percentage
  - `impressions` (bigint) - Total impressions
  - `conversions` (integer) - Total conversions
  - `cpa` (numeric) - Cost per acquisition
  - `metadata` (jsonb) - Additional campaign data
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `activities`
  Stores agent activity logs for audit trail and UI display
  - `id` (uuid, primary key) - Unique identifier
  - `agent_id` (uuid, foreign key) - References agents table
  - `activity_type` (text) - Type of activity (e.g., "decision", "insight", "optimization")
  - `description` (text) - Activity description
  - `metadata` (jsonb) - Additional activity data
  - `created_at` (timestamptz) - When the activity occurred

  ## Security
  - Row Level Security (RLS) is enabled on all tables
  - Public read access for demo purposes (can be restricted in production)
  - No insert/update/delete policies to prevent unauthorized modifications

  ## Indexes
  - Metrics indexed on metric_type and recorded_at for time-series queries
  - Activities indexed on agent_id and created_at for efficient activity logs
  - Campaigns indexed on platform for quick lookups

  ## Notes
  - All numeric fields use appropriate precision for their data types
  - JSONB fields allow flexible metadata storage without schema changes
  - Timestamps are timezone-aware for global deployment
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  icon text NOT NULL DEFAULT 'brain',
  confidence numeric(5,2) NOT NULL DEFAULT 0 CHECK (confidence >= 0 AND confidence <= 100),
  current_task text DEFAULT '',
  progress numeric(5,2) NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  mode text NOT NULL DEFAULT 'auto' CHECK (mode IN ('auto', 'semi-auto', 'manual')),
  status text NOT NULL DEFAULT 'idle' CHECK (status IN ('active', 'idle', 'processing')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type text NOT NULL,
  value numeric NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  current_budget numeric NOT NULL DEFAULT 0,
  suggested_budget numeric NOT NULL DEFAULT 0,
  roi numeric(6,2) NOT NULL DEFAULT 0,
  impressions bigint NOT NULL DEFAULT 0,
  conversions integer NOT NULL DEFAULT 0,
  cpa numeric(10,2) NOT NULL DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  description text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_metrics_type_time ON metrics(metric_type, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_agent ON activities(agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_platform ON campaigns(platform);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (demo purposes)
CREATE POLICY "Allow public read access to agents"
  ON agents FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to metrics"
  ON metrics FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to campaigns"
  ON campaigns FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to activities"
  ON activities FOR SELECT
  TO anon
  USING (true);

-- Insert seed data for agents
INSERT INTO agents (name, type, icon, confidence, current_task, progress, mode, status)
VALUES
  ('User Behavior Agent', 'behavioral', 'users', 94, 'Analyzing session drop-off patterns', 75, 'auto', 'active'),
  ('Content Optimizer', 'content', 'message', 89, 'Testing headline variations', 62, 'auto', 'processing'),
  ('Conversion Agent', 'conversion', 'target', 96, 'Optimizing funnel progression', 88, 'auto', 'active'),
  ('ROI Analyzer', 'roi', 'trending', 91, 'Calculating attribution models', 45, 'semi-auto', 'active'),
  ('Audience Intelligence', 'audience', 'eye', 87, 'Segmenting users', 91, 'auto', 'active'),
  ('Creative AI', 'creative', 'brain', 93, 'Generating ad variations', 70, 'auto', 'active'),
  ('Engagement AI', 'engagement', 'zap', 88, 'Optimizing send times', 55, 'auto', 'active'),
  ('Market Trends', 'market', 'chart', 85, 'Monitoring competitor activity', 38, 'manual', 'idle')
ON CONFLICT (id) DO NOTHING;

-- Insert seed data for campaigns
INSERT INTO campaigns (platform, current_budget, suggested_budget, roi, impressions, conversions, cpa)
VALUES
  ('Google Ads', 35000, 42000, 287, 2450000, 1247, 28.06),
  ('Facebook', 28000, 24000, 198, 1870000, 892, 31.39),
  ('LinkedIn', 18000, 22000, 342, 560000, 445, 40.45),
  ('Instagram', 12000, 9000, 156, 980000, 312, 38.46),
  ('TikTok', 7000, 3000, 89, 1250000, 156, 44.87)
ON CONFLICT (id) DO NOTHING;