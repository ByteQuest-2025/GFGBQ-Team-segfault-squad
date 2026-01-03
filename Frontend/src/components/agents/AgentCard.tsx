import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface AgentCardProps {
  name: string;
  icon: React.ReactNode;
  confidence: number;
  currentTask: string;
  progress: number;
  decisionsToday: number;
  roiImpact: number;
  activeTasks: number;
  maxTasks: number;
  mode: 'auto' | 'semi-auto' | 'manual';
  activities: Array<{ time: string; type: string; description: string }>;
}

export function AgentCard({
  name,
  icon,
  confidence,
  currentTask,
  progress,
  decisionsToday,
  roiImpact,
  activeTasks,
  maxTasks,
  mode: initialMode,
  activities
}: AgentCardProps) {
  const [mode, setMode] = useState(initialMode);

  return (
    <GlassCard hover className="animate-scale-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#00F3FF]/20 flex items-center justify-center text-[#00F3FF] border border-[#00F3FF]/40">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <StatusBadge status="active" pulse>
              {confidence}% Confidence
            </StatusBadge>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="text-xs text-gray-400 mb-2">Current Task</div>
        <div className="text-sm text-white mb-3 italic">"{currentTask}"</div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00F3FF] to-[#0066FF] transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">{progress}% complete</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-xl font-bold text-white">{decisionsToday}</div>
          <div className="text-xs text-gray-400">Decisions Today</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="flex items-center justify-center gap-1">
            <span className={`text-xl font-bold ${roiImpact >= 0 ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}`}>
              {roiImpact >= 0 ? '+' : ''}{roiImpact.toFixed(1)}%
            </span>
            {roiImpact >= 0 ? (
              <TrendingUp className="w-4 h-4 text-[#00FF9D]" />
            ) : (
              <TrendingDown className="w-4 h-4 text-[#FF4D4D]" />
            )}
          </div>
          <div className="text-xs text-gray-400">ROI Impact</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-xl font-bold text-white">
            {activeTasks}/{maxTasks}
          </div>
          <div className="text-xs text-gray-400">Active Tasks</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2">Operation Mode</div>
        <div className="flex gap-2">
          {(['auto', 'semi-auto', 'manual'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${mode === m
                  ? 'bg-[#0066FF] text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
            >
              {m === 'semi-auto' ? 'Semi-Auto' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs text-gray-400 mb-2">Recent Activity</div>
        <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
          {activities.map((activity, idx) => (
            <div
              key={idx}
              className="p-2 bg-white/5 rounded border-l-2 border-[#00F3FF]/50 text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400">{activity.time}</span>
                <span className="text-[#00F3FF] font-mono uppercase text-[10px]">
                  {activity.type}
                </span>
              </div>
              <div className="text-white">{activity.description}</div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
