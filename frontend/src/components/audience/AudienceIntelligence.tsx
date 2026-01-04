import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { Users, TrendingUp, Target, DollarSign } from 'lucide-react';

export function AudienceIntelligence() {
  const personas = [
    { name: 'Tech-Savvy Early Adopters', size: 24500, ltv: 1245, convRate: 8.7, icon: '🚀' },
    { name: 'Budget-Conscious Shoppers', size: 18700, ltv: 487, convRate: 6.2, icon: '💰' },
    { name: 'Premium Quality Seekers', size: 12300, ltv: 2890, convRate: 12.4, icon: '⭐' },
    { name: 'Social Influencers', size: 9800, ltv: 765, convRate: 5.9, icon: '📱' },
  ];

  const funnelData = [
    { stage: 'Awareness', count: 125000, pct: 100 },
    { stage: 'Interest', count: 87500, pct: 70 },
    { stage: 'Consideration', count: 52500, pct: 42 },
    { stage: 'Intent', count: 25000, pct: 20 },
    { stage: 'Purchase', count: 10000, pct: 8 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Audience Intelligence</h2>
        <p className="text-gray-400">AI-powered customer insights and segmentation</p>
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
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-[#00FF9D]" />
            <div>
              <div className="text-sm text-gray-400">Avg. LTV</div>
              <div className="text-3xl font-bold text-gradient-lime">$1,247</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-[#00F3FF]" />
            <div>
              <div className="text-sm text-gray-400">Conversion Rate</div>
              <div className="text-3xl font-bold text-white">8.3%</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((stage, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-medium">{stage.stage}</span>
                  <span className="text-gray-400">{stage.count.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00F3FF]"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Top Segments</h3>
          <div className="space-y-3">
            {[
              { name: 'High-Intent', rate: 14.2 },
              { name: 'Email Engaged', rate: 9.8 },
              { name: 'Repeat Customers', rate: 32.1 },
              { name: 'Mobile Users', rate: 6.7 },
            ].map((seg, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-medium">{seg.name}</span>
                  <StatusBadge status="active">{seg.rate}%</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">Customer Personas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, idx) => (
            <GlassCard key={idx} hover className="animate-scale-in">
              <div className="text-5xl mb-3 text-center">{persona.icon}</div>
              <h4 className="font-bold text-white text-center mb-3 text-sm">{persona.name}</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white font-mono">{persona.size.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LTV:</span>
                  <span className="text-[#00FF9D] font-mono">${persona.ltv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Conv:</span>
                  <span className="text-white font-mono">{persona.convRate}%</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
