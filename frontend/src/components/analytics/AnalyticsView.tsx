import { GlassCard } from '../ui/GlassCard';
import { Sparkline } from '../ui/Sparkline';
import { Button } from '../ui/Button';
import { BarChart3, Download, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { StatusBadge } from '../ui/StatusBadge';

export function AnalyticsView() {
  const [dateRange, setDateRange] = useState('30days');

  const timeSeriesData = {
    roi: [245, 252, 248, 265, 272, 280, 287, 295, 302, 310, 318, 325],
    conversions: [142, 148, 145, 158, 165, 172, 180, 188, 196, 205, 214, 224],
    engagement: [62, 65, 63, 68, 71, 74, 76, 78, 80, 82, 84, 85],
    spend: [8400, 8500, 8450, 8600, 8700, 8800, 8950, 9100, 9250, 9400, 9550, 9700],
  };

  const performanceMetrics = [
    {
      label: 'Total Revenue Generated',
      value: '$1,247,450',
      change: 18.2,
      period: 'vs last 30 days',
      color: '#00FF9D'
    },
    {
      label: 'Average ROI',
      value: '287.4%',
      change: 12.8,
      period: 'campaign average',
      color: '#00F3FF'
    },
    {
      label: 'Conversion Rate',
      value: '8.42%',
      change: -0.5,
      period: 'vs baseline',
      color: '#0066FF'
    },
    {
      label: 'Cost per Acquisition',
      value: '$34.28',
      change: -12.3,
      period: 'improvement',
      color: '#00CC88'
    },
  ];

  const agentPerformance = [
    { name: 'Conversion Agent', efficiency: 96, impact: 342, status: 'exceeding' },
    { name: 'Content Optimizer', efficiency: 89, impact: 247, status: 'meeting' },
    { name: 'User Behavior Agent', efficiency: 94, impact: 284, status: 'exceeding' },
    { name: 'ROI Analyzer', efficiency: 91, impact: 156, status: 'meeting' },
    { name: 'Engagement AI', efficiency: 88, impact: 198, status: 'meeting' },
    { name: 'Audience Intelligence', efficiency: 87, impact: 142, status: 'meeting' },
  ];

  const channelBreakdown = [
    { channel: 'Google Ads', roi: 287, spend: 35000, conversions: 1247, share: 28 },
    { channel: 'LinkedIn', roi: 342, spend: 18000, conversions: 445, share: 18 },
    { channel: 'Facebook', roi: 198, spend: 28000, conversions: 892, share: 22 },
    { channel: 'Instagram', roi: 156, spend: 12000, conversions: 312, share: 12 },
    { channel: 'TikTok', roi: 89, spend: 7000, conversions: 156, share: 7 },
  ];

  const topPerformers = [
    { name: 'High-Intent Segment', value: 14.2, unit: 'conv%', trend: 'up' },
    { name: 'Email Audience', value: 9.8, unit: 'conv%', trend: 'up' },
    { name: 'Repeat Customers', value: 32.1, unit: 'conv%', trend: 'up' },
    { name: 'Mobile Users', value: 6.7, unit: 'conv%', trend: 'neutral' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-[#00F3FF]" />
          <div>
            <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
            <p className="text-gray-400">Deep-dive performance insights and reporting</p>
          </div>
        </div>
        <Button icon={<Download className="w-5 h-5" />} variant="primary">
          Export Report
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-2 p-4 glass-card">
        <Calendar className="w-5 h-5 text-gray-400" />
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-transparent text-white border-none outline-none cursor-pointer font-medium"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="1year">Last 1 year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {performanceMetrics.map((metric, idx) => (
          <GlassCard key={idx} className="animate-scale-in">
            <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
            <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className={`w-4 h-4 ${metric.change >= 0 ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}`} />
              <span className={metric.change >= 0 ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}>
                {metric.change >= 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-gray-500">{metric.period}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Performance Trends</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">ROI Trajectory</span>
                <span className="text-[#00FF9D] font-mono">+32.7%</span>
              </div>
              <Sparkline
                data={timeSeriesData.roi}
                width={250}
                height={40}
                color="#00FF9D"
                fillColor="rgba(0, 255, 157, 0.1)"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Conversions Growth</span>
                <span className="text-[#00F3FF] font-mono">+57.7%</span>
              </div>
              <Sparkline
                data={timeSeriesData.conversions}
                width={250}
                height={40}
                color="#00F3FF"
                fillColor="rgba(0, 243, 255, 0.1)"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Engagement Rate</span>
                <span className="text-[#0066FF] font-mono">+37.1%</span>
              </div>
              <Sparkline
                data={timeSeriesData.engagement}
                width={250}
                height={40}
                color="#0066FF"
                fillColor="rgba(0, 102, 255, 0.1)"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Total Spend</span>
                <span className="text-[#FF6B35] font-mono">+15.5%</span>
              </div>
              <Sparkline
                data={timeSeriesData.spend}
                width={250}
                height={40}
                color="#FF6B35"
                fillColor="rgba(255, 107, 53, 0.1)"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">AI Agent Performance</h3>
          <div className="space-y-3">
            {agentPerformance.map((agent, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-white text-sm">{agent.name}</h4>
                    <div className="text-xs text-gray-400">
                      Impact: +{agent.impact} conversions
                    </div>
                  </div>
                  <StatusBadge
                    status={agent.status === 'exceeding' ? 'success' : 'active'}
                  >
                    {agent.efficiency}%
                  </StatusBadge>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00F3FF] to-[#0066FF]"
                    style={{ width: `${agent.efficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Channel Performance</h3>
          <div className="space-y-3">
            {channelBreakdown.map((channel, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{channel.channel}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#00FF9D]">{channel.roi}% ROI</div>
                    <div className="text-xs text-gray-400">{channel.share}% budget</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <span className="text-gray-400">Spend:</span>
                    <div className="text-white font-mono">${(channel.spend / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Conversions:</span>
                    <div className="text-white font-mono">{channel.conversions}</div>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00F3FF]"
                    style={{ width: `${channel.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-4">Top Performing Segments</h3>
          <div className="space-y-3">
            {topPerformers.map((performer, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-r from-[#00F3FF]/10 to-[#0066FF]/10 rounded-lg border border-[#00F3FF]/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white">{performer.name}</h4>
                    <div className="text-sm text-gray-400 mt-1">Conversion Rate</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#00FF9D]">
                      {performer.value}%
                    </div>
                    {performer.trend === 'up' && (
                      <div className="text-xs text-[#00FF9D]">↑ Trending</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-lg font-bold text-white mb-4">Detailed Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400">Metric</th>
                <th className="text-center py-3 px-4 text-gray-400">Current</th>
                <th className="text-center py-3 px-4 text-gray-400">Previous</th>
                <th className="text-center py-3 px-4 text-gray-400">Change</th>
                <th className="text-center py-3 px-4 text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-white">Campaign ROI</td>
                <td className="text-center py-3 px-4 text-white font-mono">287.4%</td>
                <td className="text-center py-3 px-4 text-gray-400 font-mono">255.2%</td>
                <td className="text-center py-3 px-4 text-[#00FF9D] font-mono">+32.2%</td>
                <td className="text-center py-3 px-4">
                  <StatusBadge status="success">Excellent</StatusBadge>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-white">Conversion Rate</td>
                <td className="text-center py-3 px-4 text-white font-mono">8.42%</td>
                <td className="text-center py-3 px-4 text-gray-400 font-mono">8.47%</td>
                <td className="text-center py-3 px-4 text-[#FF4D4D] font-mono">-0.5%</td>
                <td className="text-center py-3 px-4">
                  <StatusBadge status="active">Good</StatusBadge>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-white">Cost per Acquisition</td>
                <td className="text-center py-3 px-4 text-white font-mono">$34.28</td>
                <td className="text-center py-3 px-4 text-gray-400 font-mono">$39.02</td>
                <td className="text-center py-3 px-4 text-[#00FF9D] font-mono">-12.3%</td>
                <td className="text-center py-3 px-4">
                  <StatusBadge status="success">Improving</StatusBadge>
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-white">Average Order Value</td>
                <td className="text-center py-3 px-4 text-white font-mono">$127.50</td>
                <td className="text-center py-3 px-4 text-gray-400 font-mono">$118.30</td>
                <td className="text-center py-3 px-4 text-[#00FF9D] font-mono">+7.7%</td>
                <td className="text-center py-3 px-4">
                  <StatusBadge status="success">Growing</StatusBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
