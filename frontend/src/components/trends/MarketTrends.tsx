import { GlassCard } from '../ui/GlassCard';
import { Sparkline } from '../ui/Sparkline';
import { StatusBadge } from '../ui/StatusBadge';
import { TrendingUp, TrendingDown, Brain } from 'lucide-react';

export function MarketTrends() {
  const trends = [
    {
      metric: 'Search Volume',
      value: '245K',
      change: 22,
      trend: 'up' as const,
      data: [180, 185, 195, 205, 220, 235, 245],
    },
    {
      metric: 'Competitor Activity',
      value: '147',
      change: 18,
      trend: 'up' as const,
      data: [120, 125, 132, 138, 142, 145, 147],
    },
    {
      metric: 'Market Demand',
      value: '892',
      change: -5,
      trend: 'down' as const,
      data: [940, 930, 920, 910, 900, 895, 892],
    },
    {
      metric: 'Social Mentions',
      value: '12.4K',
      change: 34,
      trend: 'up' as const,
      data: [9200, 9800, 10400, 11000, 11600, 12000, 12400],
    },
  ];

  const explanations = [
    {
      title: 'Why conversion increased 12%',
      conf: 92,
      reasons: [
        'Budget reallocated to high-intent segments',
        'Ad creative optimized for mobile-first users',
        'Timing adjusted based on engagement patterns',
      ],
      impact: '+$47.2K',
    },
    {
      title: 'Why engagement improved',
      conf: 88,
      reasons: [
        'Content personalization increased 34%',
        'Email subject lines optimized',
        'Push notification timing aligned',
      ],
      impact: '+18.7%',
    },
    {
      title: 'Market opportunity detected',
      conf: 85,
      reasons: [
        'Search volume for "AI automation" up 142%',
        'Competitor ad spend down 28%',
        'Seasonal trend shows 3-week high period',
      ],
      impact: '+$82K potential',
    },
    {
      title: 'Budget inefficiency warning',
      conf: 79,
      reasons: [
        'TikTok ROI declining over 14 days',
        'Instagram/TikTok overlap 34%',
        'CPA increased 22%',
      ],
      impact: '-$12K risk',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Market Trends & Intelligence</h2>
        <p className="text-gray-400">Real-time market analysis with explainable AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {trends.map((item, idx) => (
          <GlassCard key={idx} className="animate-scale-in">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-gray-400 mb-1">{item.metric}</div>
                <div className="text-2xl font-bold text-white">{item.value}</div>
              </div>
              <div className={`flex items-center gap-1 ${item.trend === 'up' ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}`}>
                {item.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-bold">{item.change}%</span>
              </div>
            </div>
            <Sparkline
              data={item.data}
              width={200}
              height={40}
              color={item.trend === 'up' ? '#00FF9D' : '#FF4D4D'}
            />
          </GlassCard>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-[#00F3FF]" />
          Explainable AI Insights
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {explanations.map((expl, idx) => (
            <GlassCard key={idx} hover className="animate-scale-in">
              <div className="mb-4">
                <h4 className="font-bold text-white mb-2">{expl.title}</h4>
                <StatusBadge status="success">{expl.conf}% confidence</StatusBadge>
              </div>

              <div className="space-y-2 mb-4">
                {expl.reasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{reason}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Impact</span>
                  <span className="text-sm font-bold text-[#00FF9D]">{expl.impact}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
