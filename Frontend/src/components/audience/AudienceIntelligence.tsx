import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { Users, TrendingUp, Target, DollarSign, Clock, MapPin } from 'lucide-react';

export function AudienceIntelligence() {
  const personas = [
    {
      name: 'Tech-Savvy Early Adopters',
      size: 24500,
      growth: '+18%',
      ltv: 1245,
      conversionRate: 8.7,
      topInterests: ['Innovation', 'Gadgets', 'AI'],
      demographics: '25-34 years, Urban',
      icon: '🚀'
    },
    {
      name: 'Budget-Conscious Shoppers',
      size: 18700,
      growth: '+12%',
      ltv: 487,
      conversionRate: 6.2,
      topInterests: ['Deals', 'Reviews', 'Comparison'],
      demographics: '35-44 years, Suburban',
      icon: '💰'
    },
    {
      name: 'Premium Quality Seekers',
      size: 12300,
      growth: '+28%',
      ltv: 2890,
      conversionRate: 12.4,
      topInterests: ['Luxury', 'Quality', 'Prestige'],
      demographics: '45-54 years, Urban',
      icon: '⭐'
    },
    {
      name: 'Social Influencers',
      size: 9800,
      growth: '+35%',
      ltv: 765,
      conversionRate: 5.9,
      topInterests: ['Trends', 'Social', 'Content'],
      demographics: '18-24 years, Urban',
      icon: '📱'
    }
  ];

  const funnelData = [
    { stage: 'Awareness', count: 125000, percentage: 100, color: '#00F3FF' },
    { stage: 'Interest', count: 87500, percentage: 70, color: '#0066FF' },
    { stage: 'Consideration', count: 52500, percentage: 42, color: '#2A3F8F' },
    { stage: 'Intent', count: 25000, percentage: 20, color: '#00FF9D' },
    { stage: 'Purchase', count: 10000, percentage: 8, color: '#00CC88' }
  ];

  const topSegments = [
    { name: 'High-Intent Visitors', size: 15420, conversionRate: 14.2, color: '#00FF9D' },
    { name: 'Email Engaged', size: 28750, conversionRate: 9.8, color: '#00F3FF' },
    { name: 'Cart Abandoners', size: 12340, conversionRate: 4.5, color: '#FFC043' },
    { name: 'Repeat Customers', size: 8920, conversionRate: 32.1, color: '#0066FF' },
    { name: 'Mobile-First Users', size: 34200, conversionRate: 6.7, color: '#2A3F8F' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Audience Intelligence</h2>
        <p className="text-gray-400">AI-powered customer insights and behavior analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-[#00F3FF]" />
            <div>
              <div className="text-sm text-gray-400">Total Audience</div>
              <div className="text-3xl font-bold text-white">65.3K</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <TrendingUp className="w-4 h-4 text-[#00FF9D]" />
            <span className="text-[#00FF9D]">+22.4%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-[#00FF9D]" />
            <div>
              <div className="text-sm text-gray-400">Avg. Lifetime Value</div>
              <div className="text-3xl font-bold text-gradient-lime">$1,247</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <TrendingUp className="w-4 h-4 text-[#00FF9D]" />
            <span className="text-[#00FF9D]">+$142</span>
            <span className="text-gray-500">increase</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-[#00F3FF]" />
            <div>
              <div className="text-sm text-gray-400">Avg. Conversion Rate</div>
              <div className="text-3xl font-bold text-white">8.3%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <TrendingUp className="w-4 h-4 text-[#00FF9D]" />
            <span className="text-[#00FF9D]">+1.7%</span>
            <span className="text-gray-500">improvement</span>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((stage, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">{stage.count.toLocaleString()}</span>
                    <span className="text-[#00F3FF] font-mono">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="h-8 bg-white/10 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full transition-all duration-1000 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      width: `${stage.percentage}%`,
                      background: `linear-gradient(90deg, ${stage.color}, ${stage.color}cc)`
                    }}
                  >
                    {stage.percentage > 15 && `${stage.percentage}%`}
                  </div>
                </div>
                {idx < funnelData.length - 1 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Drop-off: {((funnelData[idx].count - funnelData[idx + 1].count) / funnelData[idx].count * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Top Performing Segments</h3>
          <div className="space-y-3">
            {topSegments.map((segment, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm">{segment.name}</span>
                  <StatusBadge status="active">{segment.conversionRate}%</StatusBadge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{segment.size.toLocaleString()} users</span>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-gray-400">Segment {idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">AI-Generated Customer Personas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, idx) => (
            <GlassCard key={idx} hover className="animate-scale-in">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{persona.icon}</div>
                <h4 className="font-bold text-white mb-2">{persona.name}</h4>
                <StatusBadge status="success">{persona.growth}</StatusBadge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-[#00F3FF]" />
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white font-mono">{persona.size.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-[#00FF9D]" />
                  <span className="text-gray-400">LTV:</span>
                  <span className="text-[#00FF9D] font-mono">${persona.ltv}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-[#00F3FF]" />
                  <span className="text-gray-400">Conv:</span>
                  <span className="text-white font-mono">{persona.conversionRate}%</span>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-start gap-2 text-xs mb-2">
                    <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-gray-400">{persona.demographics}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {persona.topInterests.map((interest, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#00F3FF]/10 text-[#00F3FF] rounded text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
