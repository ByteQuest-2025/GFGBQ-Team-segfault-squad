import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { TrendingUp, DollarSign, Users, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiClient, type AnalyzeResponse } from '../../lib/api';

interface Campaign {
  id: string;
  name: string;
  budget: number;
  roi: number;
  cpa: number;
  spend: number;
  analysis?: AnalyzeResponse;
  analyzing?: boolean;
}

export function CampaignOptimization() {
  const [showModal, setShowModal] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Google Ads', budget: 35000, roi: 287, cpa: 45.5, spend: 12000 },
    { id: '2', name: 'Facebook', budget: 28000, roi: 198, cpa: 52.3, spend: 8500 },
    { id: '3', name: 'LinkedIn', budget: 18000, roi: 342, cpa: 28.7, spend: 6200 },
    { id: '4', name: 'Instagram', budget: 12000, roi: 156, cpa: 38.2, spend: 4100 },
    { id: '5', name: 'TikTok', budget: 7000, roi: 89, cpa: 55.1, spend: 2800 },
  ]);

  useEffect(() => {
    // Check backend connection
    apiClient.healthCheck()
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('disconnected'));
  }, []);

  const analyzeCampaign = async (campaign: Campaign) => {
    setCampaigns(prev => prev.map(c => 
      c.id === campaign.id ? { ...c, analyzing: true } : c
    ));

    try {
      const analysis = await apiClient.analyzeCampaign({
        campaign_id: campaign.id,
        cpa: campaign.cpa,
        spend: campaign.spend,
      });

      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id ? { ...c, analysis, analyzing: false } : c
      ));
    } catch (error) {
      console.error('Failed to analyze campaign:', error);
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id ? { ...c, analyzing: false } : c
      ));
    }
  };

  const getDecisionColor = (decision?: string) => {
    switch (decision) {
      case 'raise_bid':
        return 'text-[#00FF9D]';
      case 'lower_bid':
        return 'text-[#FF6B6B]';
      case 'maintain':
        return 'text-[#00F3FF]';
      default:
        return 'text-gray-400';
    }
  };

  const getDecisionLabel = (decision?: string) => {
    switch (decision) {
      case 'raise_bid':
        return 'Raise Bid';
      case 'lower_bid':
        return 'Lower Bid';
      case 'maintain':
        return 'Maintain';
      case 'skip':
        return 'Skip (Locked)';
      default:
        return 'Not Analyzed';
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Campaign Optimization</h2>
          <p className="text-gray-400">AI-recommended budget allocation</p>
          <div className="flex items-center gap-2 mt-2">
            {backendStatus === 'checking' && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking backend connection...</span>
              </div>
            )}
            {backendStatus === 'connected' && (
              <div className="flex items-center gap-2 text-sm text-[#00FF9D]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Backend Connected</span>
              </div>
            )}
            {backendStatus === 'disconnected' && (
              <div className="flex items-center gap-2 text-sm text-[#FF6B6B]">
                <AlertCircle className="w-4 h-4" />
                <span>Backend Disconnected</span>
              </div>
            )}
          </div>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Apply Strategy
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Campaign Analysis</h3>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-white font-medium">{campaign.name}</h4>
                    <p className="text-xs text-gray-400">
                      CPA: ${campaign.cpa.toFixed(2)} | Spend: ${campaign.spend.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-[#00FF9D] font-bold">{campaign.roi}%</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getDecisionColor(campaign.analysis?.decision)}`}>
                      {getDecisionLabel(campaign.analysis?.decision)}
                    </span>
                    {campaign.analysis?.suggested_action && (
                      <span className="text-xs text-gray-400">
                        (Factor: {campaign.analysis.suggested_action.factor.toFixed(2)}x)
                      </span>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => analyzeCampaign(campaign)}
                    disabled={campaign.analyzing || backendStatus !== 'connected'}
                  >
                    {campaign.analyzing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Analyze'
                    )}
                  </Button>
                </div>
                {campaign.analysis?.reason && (
                  <p className="text-xs text-gray-500 mt-2">{campaign.analysis.reason}</p>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-[#00F3FF]" />
              <div>
                <div className="text-sm text-gray-400">Projected ROI Increase</div>
                <div className="text-2xl font-bold text-gradient-lime">+18.7%</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-[#00F3FF]" />
              <div>
                <div className="text-sm text-gray-400">Additional Conversions</div>
                <div className="text-2xl font-bold text-gradient-cyan">+342</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-[#00F3FF]" />
              <div>
                <div className="text-sm text-gray-400">Cost Efficiency</div>
                <div className="text-2xl font-bold text-gradient-lime">-12.3%</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
          <GlassCard className="max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirm AI Strategy</h3>
            <p className="text-gray-300 mb-6">
              This will apply the recommended budget allocation. Changes take effect immediately.
            </p>
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1" onClick={() => setShowModal(false)}>
                Apply
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
