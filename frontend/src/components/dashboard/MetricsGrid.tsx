import { MetricCard } from '../ui/MetricCard';
import { ProgressRing } from '../ui/ProgressRing';
import { Sparkline } from '../ui/Sparkline';
import { GlassCard } from '../ui/GlassCard';
import { TrendingUp, Target, DollarSign, Activity, Users, Zap, Wallet, Brain } from 'lucide-react';
import { useEffect, useState } from 'react';

export function MetricsGrid() {
  const [roiValue, setRoiValue] = useState(234.7);
  const [engagementData] = useState([45, 52, 48, 61, 58, 67, 72, 68, 75, 82, 78, 85]);
  const [revenueValue, setRevenueValue] = useState(1247650);

  useEffect(() => {
    const roiTimer = setInterval(() => {
      setRoiValue(prev => prev + (Math.random() * 0.5 - 0.2));
    }, 3000);

    const revenueTimer = setInterval(() => {
      setRevenueValue(prev => prev + Math.floor(Math.random() * 500));
    }, 5000);

    return () => {
      clearInterval(roiTimer);
      clearInterval(revenueTimer);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="lg:col-span-1">
        <MetricCard
          label="Total Campaign ROI"
          value={`${roiValue.toFixed(1)}%`}
          trend="up"
          delta="+12.3%"
          subtitle="vs last month"
          icon={<TrendingUp className="w-5 h-5" />}
          gradient
        />
      </div>

      <div className="lg:col-span-1">
        <GlassCard className="animate-scale-in h-full">
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm text-gray-400 font-medium">Engagement Rate</span>
            <Activity className="w-5 h-5 text-[#00F3FF]" />
          </div>
          <div className="text-3xl font-bold text-white mb-3">78.5%</div>
          <div className="flex items-center gap-3">
            <Sparkline data={engagementData} width={120} height={40} />
            <div className="text-sm">
              <span className="text-[#00FF9D]">+5.2%</span>
              <span className="text-gray-500 ml-1">today</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="lg:col-span-1">
        <MetricCard
          label="Conversion Lift"
          value="+42.8%"
          trend="up"
          delta="Above baseline"
          icon={<Target className="w-5 h-5" />}
          gradient
        />
      </div>

      <div className="lg:col-span-1">
        <GlassCard className="animate-scale-in h-full flex flex-col items-center justify-center">
          <ProgressRing
            value={82}
            max={100}
            size={100}
            strokeWidth={8}
            label="Budget Used"
            color="#00F3FF"
          />
          <div className="text-sm text-gray-400 mt-3">$82,450 / $100,000</div>
        </GlassCard>
      </div>

      <div className="lg:col-span-1">
        <MetricCard
          label="Active AI Agents"
          value="8"
          subtitle="All operational"
          icon={<Brain className="w-5 h-5" />}
        />
      </div>

      <div className="lg:col-span-1">
        <MetricCard
          label="Autonomous Decisions"
          value="1,247"
          trend="up"
          delta="+142"
          subtitle="last 24h"
          icon={<Zap className="w-5 h-5" />}
        />
      </div>

      <div className="lg:col-span-1">
        <GlassCard className="animate-scale-in h-full">
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm text-gray-400 font-medium">Revenue Impact</span>
            <DollarSign className="w-5 h-5 text-[#00FF9D]" />
          </div>
          <div className="text-3xl font-bold text-gradient-lime mb-2 font-mono">
            ${(revenueValue / 1000).toFixed(1)}K
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-[#00FF9D]" />
            <span className="text-[#00FF9D]">+$47.2K</span>
            <span className="text-gray-500">this week</span>
          </div>
        </GlassCard>
      </div>

      <div className="lg:col-span-1">
        <MetricCard
          label="Learning Cycles"
          value="94%"
          trend="up"
          subtitle="completion rate"
          icon={<Users className="w-5 h-5" />}
        />
      </div>
    </div>
  );
}
