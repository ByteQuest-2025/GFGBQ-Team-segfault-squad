import { AgentCard } from './AgentCard';
import { Users, MessageSquare, Target, TrendingUp, Eye, Brain, Zap, BarChart } from 'lucide-react';

export function AgentControlPanel() {
  const agents = [
    {
      name: 'User Behavior Agent',
      icon: <Users className="w-6 h-6" />,
      confidence: 94,
      currentTask: 'Analyzing session drop-off patterns in checkout flow',
      progress: 75,
      decisionsToday: 142,
      roiImpact: 3.2,
      activeTasks: 3,
      maxTasks: 5,
      mode: 'auto' as const,
      activities: [
        { time: '2m ago', type: 'decision', description: 'Increased ad spend on Segment A by 15%' },
        { time: '8m ago', type: 'insight', description: 'Detected 22% increase in mobile traffic' },
        { time: '15m ago', type: 'optimization', description: 'Adjusted bid strategy for peak hours' }
      ]
    },
    {
      name: 'Content Optimizer',
      icon: <MessageSquare className="w-6 h-6" />,
      confidence: 89,
      currentTask: 'Testing headline variations for landing page conversion',
      progress: 62,
      decisionsToday: 87,
      roiImpact: 5.8,
      activeTasks: 4,
      maxTasks: 5,
      mode: 'auto' as const,
      activities: [
        { time: '1m ago', type: 'test', description: 'Launched A/B test on CTA button color' },
        { time: '12m ago', type: 'decision', description: 'Promoted winning headline variant' },
        { time: '25m ago', type: 'insight', description: 'Identified high-performing content pattern' }
      ]
    },
    {
      name: 'Conversion Agent',
      icon: <Target className="w-6 h-6" />,
      confidence: 96,
      currentTask: 'Optimizing funnel progression from interest to purchase',
      progress: 88,
      decisionsToday: 203,
      roiImpact: 8.4,
      activeTasks: 5,
      maxTasks: 5,
      mode: 'auto' as const,
      activities: [
        { time: '4m ago', type: 'decision', description: 'Reduced form fields based on friction analysis' },
        { time: '10m ago', type: 'optimization', description: 'Enabled express checkout for repeat customers' },
        { time: '18m ago', type: 'insight', description: 'Cart abandonment reduced by 12%' }
      ]
    },
    {
      name: 'ROI Analyzer',
      icon: <TrendingUp className="w-6 h-6" />,
      confidence: 91,
      currentTask: 'Calculating attribution models across all touchpoints',
      progress: 45,
      decisionsToday: 156,
      roiImpact: 4.7,
      activeTasks: 2,
      maxTasks: 5,
      mode: 'semi-auto' as const,
      activities: [
        { time: '3m ago', type: 'analysis', description: 'Updated multi-touch attribution weights' },
        { time: '20m ago', type: 'insight', description: 'Email campaigns showing 3x ROI vs social' },
        { time: '32m ago', type: 'decision', description: 'Recommended budget shift to email channel' }
      ]
    },
    {
      name: 'Audience Intelligence',
      icon: <Eye className="w-6 h-6" />,
      confidence: 87,
      currentTask: 'Segmenting users based on behavioral clustering analysis',
      progress: 91,
      decisionsToday: 98,
      roiImpact: 2.9,
      activeTasks: 3,
      maxTasks: 5,
      mode: 'auto' as const,
      activities: [
        { time: '5m ago', type: 'insight', description: 'Discovered new high-value segment' },
        { time: '14m ago', type: 'decision', description: 'Created lookalike audience from converters' },
        { time: '28m ago', type: 'analysis', description: 'Updated customer lifetime value predictions' }
      ]
    },
    {
      name: 'Creative AI',
      icon: <Brain className="w-6 h-6" />,
      confidence: 93,
      currentTask: 'Generating ad creative variations optimized for engagement',
      progress: 70,
      decisionsToday: 124,
      roiImpact: 6.1,
      activeTasks: 4,
      maxTasks: 5,
      mode: 'auto' as const,
      activities: [
        { time: '7m ago', type: 'creation', description: 'Generated 12 new ad variations' },
        { time: '16m ago', type: 'test', description: 'Started creative performance testing' },
        { time: '30m ago', type: 'optimization', description: 'Paused underperforming creative set' }
      ]
    },
    {
      name: 'Engagement AI',
      icon: <Zap className="w-6 h-6" />,
      confidence: 88,
      currentTask: 'Optimizing send times and frequency for email campaigns',
      progress: 55,
      decisionsToday: 167,
      roiImpact: 3.5,
      activeTasks: 3,
      maxTasks: 5,
      mode: 'auto' as const,
      activities: [
        { time: '2m ago', type: 'decision', description: 'Adjusted email frequency for segment B' },
        { time: '11m ago', type: 'optimization', description: 'Personalized subject lines increased opens 18%' },
        { time: '22m ago', type: 'insight', description: 'Peak engagement detected at 10am EST' }
      ]
    },
    {
      name: 'Market Trends',
      icon: <BarChart className="w-6 h-6" />,
      confidence: 85,
      currentTask: 'Monitoring competitor activity and market demand shifts',
      progress: 38,
      decisionsToday: 72,
      roiImpact: 1.8,
      activeTasks: 2,
      maxTasks: 5,
      mode: 'manual' as const,
      activities: [
        { time: '6m ago', type: 'alert', description: 'Competitor increased ad spend by 40%' },
        { time: '19m ago', type: 'insight', description: 'Search volume spike detected for keyword cluster' },
        { time: '35m ago', type: 'analysis', description: 'Seasonal trend analysis completed' }
      ]
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Multi-Agent Control Panel</h2>
        <p className="text-gray-400">Monitor and manage autonomous AI agents in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent, idx) => (
          <AgentCard key={idx} {...agent} />
        ))}
      </div>
    </div>
  );
}
