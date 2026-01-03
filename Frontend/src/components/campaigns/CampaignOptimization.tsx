import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap } from 'lucide-react';
import { useState } from 'react';

interface Platform {
  name: string;
  icon: string;
  color: string;
  currentBudget: number;
  suggestedBudget: number;
  roi: number;
  impressions: number;
  conversions: number;
  cpa: number;
}

export function CampaignOptimization() {
  const [showModal, setShowModal] = useState(false);

  const platforms: Platform[] = [
    {
      name: 'Google Ads',
      icon: '🔍',
      color: '#4285F4',
      currentBudget: 35000,
      suggestedBudget: 42000,
      roi: 287,
      impressions: 2450000,
      conversions: 1247,
      cpa: 28.06
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: '#1877F2',
      currentBudget: 28000,
      suggestedBudget: 24000,
      roi: 198,
      impressions: 1870000,
      conversions: 892,
      cpa: 31.39
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: '#0A66C2',
      currentBudget: 18000,
      suggestedBudget: 22000,
      roi: 342,
      impressions: 560000,
      conversions: 445,
      cpa: 40.45
    },
    {
      name: 'Instagram',
      icon: '📸',
      color: '#E4405F',
      currentBudget: 12000,
      suggestedBudget: 9000,
      roi: 156,
      impressions: 980000,
      conversions: 312,
      cpa: 38.46
    },
    {
      name: 'TikTok',
      icon: '🎵',
      color: '#00F2EA',
      currentBudget: 7000,
      suggestedBudget: 3000,
      roi: 89,
      impressions: 1250000,
      conversions: 156,
      cpa: 44.87
    }
  ];

  const totalCurrent = platforms.reduce((sum, p) => sum + p.currentBudget, 0);
  const totalSuggested = platforms.reduce((sum, p) => sum + p.suggestedBudget, 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Campaign Optimization</h2>
          <p className="text-gray-400">AI-recommended budget allocation based on performance data</p>
        </div>
        <Button variant="primary" icon={<Zap className="w-5 h-5" />} onClick={() => setShowModal(true)}>
          Apply AI Strategy
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Current vs Suggested Allocation</h3>
          <div className="space-y-4">
            {platforms.map((platform, idx) => {
              const change = ((platform.suggestedBudget - platform.currentBudget) / platform.currentBudget) * 100;
              const isIncrease = change > 0;

              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{platform.icon}</span>
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isIncrease ? (
                        <TrendingUp className="w-4 h-4 text-[#00FF9D]" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-[#FF4D4D]" />
                      )}
                      <span className={isIncrease ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}>
                        {isIncrease ? '+' : ''}{change.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <div className="h-8 bg-white/10 rounded overflow-hidden">
                          <div
                            className="h-full bg-gray-500 transition-all duration-500"
                            style={{ width: `${(platform.currentBudget / totalCurrent) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Current: ${(platform.currentBudget / 1000).toFixed(0)}K</div>
                      </div>

                      <div className="flex-1">
                        <div className="h-8 bg-white/10 rounded overflow-hidden">
                          <div
                            className="h-full transition-all duration-500"
                            style={{
                              width: `${(platform.suggestedBudget / totalSuggested) * 100}%`,
                              background: `linear-gradient(90deg, ${platform.color}, ${platform.color}dd)`
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Suggested: ${(platform.suggestedBudget / 1000).toFixed(0)}K</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#00F3FF]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="text-white font-medium">{platform.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">ROI</div>
                    <div className="text-lg font-bold text-[#00FF9D]">{platform.roi}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Impressions</div>
                    <div className="text-sm font-mono text-white">
                      {(platform.impressions / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Conversions</div>
                    <div className="text-sm font-mono text-white">{platform.conversions}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">CPA</div>
                    <div className="text-sm font-mono text-white">${platform.cpa.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-[#00F3FF]" />
            <div>
              <div className="text-sm text-gray-400">Projected ROI Increase</div>
              <div className="text-3xl font-bold text-gradient-lime">+18.7%</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-[#00F3FF]" />
            <div>
              <div className="text-sm text-gray-400">Additional Conversions</div>
              <div className="text-3xl font-bold text-gradient-cyan">+342</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-[#00F3FF]" />
            <div>
              <div className="text-sm text-gray-400">Cost Efficiency</div>
              <div className="text-3xl font-bold text-gradient-lime">-12.3%</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
          <GlassCard className="max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirm AI Strategy</h3>
            <p className="text-gray-300 mb-6">
              This will apply the recommended budget allocation across all platforms. The changes will take effect immediately and can be reverted at any time.
            </p>
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1" onClick={() => setShowModal(false)}>
                Apply Changes
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
