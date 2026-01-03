import { GlassCard } from '../ui/GlassCard';
import { Sparkline } from '../ui/Sparkline';
import { StatusBadge } from '../ui/StatusBadge';
import { TrendingUp, TrendingDown, AlertCircle, Target, Zap, Brain } from 'lucide-react';

export function MarketTrends() {
  const trendData = [
    {
      metric: 'Search Volume',
      current: 245000,
      change: 22,
      trend: 'up' as const,
      sparkline: [180, 185, 195, 205, 220, 235, 245],
      period: '7 days'
    },
    {
      metric: 'Competitor Activity',
      current: 147,
      change: 18,
      trend: 'up' as const,
      sparkline: [120, 125, 132, 138, 142, 145, 147],
      period: '7 days'
    },
    {
      metric: 'Market Demand',
      current: 892,
      change: -5,
      trend: 'down' as const,
      sparkline: [940, 930, 920, 910, 900, 895, 892],
      period: '7 days'
    },
    {
      metric: 'Social Mentions',
      current: 12400,
      change: 34,
      trend: 'up' as const,
      sparkline: [9200, 9800, 10400, 11000, 11600, 12000, 12400],
      period: '7 days'
    }
  ];

  const explanations = [
    {
      title: 'Why conversion increased 12%',
      confidence: 92,
      reasons: [
        'Budget reallocated to high-intent segments based on behavioral patterns',
        'Ad creative optimized for mobile-first users with 3s attention span',
        'Timing adjusted based on engagement patterns showing peak activity 2-4pm'
      ],
      impact: '+$47.2K revenue',
      icon: <Target className="w-5 h-5" />
    },
    {
      title: 'Why engagement rate improved',
      confidence: 88,
      reasons: [
        'Content personalization increased relevance score by 34%',
        'Email subject lines optimized using sentiment analysis',
        'Push notification timing aligned with user activity patterns'
      ],
      impact: '+18.7% engagement',
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: 'Market opportunity detected',
      confidence: 85,
      reasons: [
        'Search volume spike for "AI automation" increased 142%',
        'Competitor ad spend decreased 28% creating opportunity window',
        'Seasonal trend analysis predicts 3-week high-demand period'
      ],
      impact: 'Potential +$82K',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: 'Risk: Budget inefficiency',
      confidence: 79,
      reasons: [
        'TikTok campaign showing declining ROI over 14 days',
        'Audience overlap detected between Instagram and TikTok (34%)',
        'CPA increased 22% while conversion rate dropped 8%'
      ],
      impact: 'Potential -$12K waste',
      icon: <AlertCircle className="w-5 h-5" />
    }
  ];

  const competitors = [
    { name: 'Competitor A', adSpend: 125000, change: 40, share: 28 },
    { name: 'Competitor B', adSpend: 98000, change: -15, share: 22 },
    { name: 'Competitor C', adSpend: 87000, change: 12, share: 19 },
    { name: 'Your Brand', adSpend: 100000, change: 8, share: 23 },
    { name: 'Others', adSpend: 35000, change: 5, share: 8 }
  ];

  const demandPredictions = [
    { week: 'Week 1', predicted: 8200, actual: 8150, confidence: 94 },
    { week: 'Week 2', predicted: 8900, actual: 8850, confidence: 91 },
    { week: 'Week 3', predicted: 9400, actual: 9500, confidence: 89 },
    { week: 'Week 4', predicted: 10200, actual: null, confidence: 87 },
    { week: 'Week 5', predicted: 11500, actual: null, confidence: 82 }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Market Trends & Intelligence</h2>
        <p className="text-gray-400">Real-time market analysis with explainable AI insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {trendData.map((item, idx) => (
          <GlassCard key={idx} className="animate-scale-in">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-gray-400 mb-1">{item.metric}</div>
                <div className="text-2xl font-bold text-white">
                  {item.current.toLocaleString()}
                </div>
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
              data={item.sparkline}
              width={200}
              height={40}
              color={item.trend === 'up' ? '#00FF9D' : '#FF4D4D'}
              fillColor={item.trend === 'up' ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255, 77, 77, 0.1)'}
            />
            <div className="text-xs text-gray-500 mt-2">{item.period}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Competitive Landscape</h3>
          <div className="space-y-4">
            {competitors.map((comp, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${comp.name === 'Your Brand' ? 'text-[#00F3FF]' : 'text-white'}`}>
                      {comp.name}
                    </span>
                    {comp.name === 'Your Brand' && (
                      <StatusBadge status="active">You</StatusBadge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-mono">${(comp.adSpend / 1000).toFixed(0)}K</span>
                    <span className={comp.change >= 0 ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}>
                      {comp.change >= 0 ? '+' : ''}{comp.change}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${comp.name === 'Your Brand' ? 'bg-[#00F3FF]' : 'bg-gray-500'
                      }`}
                    style={{ width: `${comp.share}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{comp.share}% market share</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Demand Spike Predictor</h3>
          <div className="space-y-3">
            {demandPredictions.map((week, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${week.actual === null
                    ? 'bg-[#00F3FF]/10 border-[#00F3FF]/40'
                    : 'bg-white/5 border-white/10'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{week.week}</span>
                  <StatusBadge status={week.confidence >= 90 ? 'success' : week.confidence >= 85 ? 'active' : 'warning'}>
                    {week.confidence}% confidence
                  </StatusBadge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-400">Predicted</div>
                    <div className="text-white font-mono">{week.predicted.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Actual</div>
                    <div className="text-white font-mono">
                      {week.actual ? week.actual.toLocaleString() : '—'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-[#00F3FF]" />
          Explainable AI Insights
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {explanations.map((explanation, idx) => (
            <GlassCard key={idx} hover className="animate-scale-in">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#00F3FF]/20 flex items-center justify-center text-[#00F3FF]">
                  {explanation.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{explanation.title}</h4>
                  <StatusBadge status="success">{explanation.confidence}% confidence</StatusBadge>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {explanation.reasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{reason}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Projected Impact</span>
                  <span className="text-sm font-bold text-[#00FF9D]">{explanation.impact}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
