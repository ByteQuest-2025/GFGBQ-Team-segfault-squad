import { GlassCard } from './GlassCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  delta?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  gradient?: boolean;
}

export function MetricCard({ label, value, trend, delta, subtitle, icon, gradient = false }: MetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-[#00FF9D]' : trend === 'down' ? 'text-[#FF4D4D]' : 'text-gray-400';

  return (
    <GlassCard className="animate-scale-in">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-gray-400 font-medium">{label}</span>
        {icon && <div className="text-[#00F3FF]">{icon}</div>}
      </div>

      <div className={`text-3xl font-bold mb-2 ${gradient ? 'text-gradient-lime' : 'text-white'}`}>
        {value}
      </div>

      {(trend || delta) && (
        <div className="flex items-center gap-2 text-sm">
          {trend && <TrendIcon className={`w-4 h-4 ${trendColor}`} />}
          {delta && <span className={trendColor}>{delta}</span>}
          {subtitle && <span className="text-gray-500">{subtitle}</span>}
        </div>
      )}
    </GlassCard>
  );
}
