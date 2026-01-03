import { Activity } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { useEffect, useState } from 'react';

export function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-card mb-8 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-8 h-8 text-[#00F3FF]" />
              <div className="absolute inset-0 animate-particle">
                <div className="w-2 h-2 rounded-full bg-[#00F3FF] absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-cyan">AI Marketing Command Center</h1>
              <p className="text-sm text-gray-400 font-space">Adaptive Multi-Agent Orchestration</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm font-space text-gray-400">System Time</div>
            <div className="text-lg font-mono text-white">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>
          <StatusBadge status="success" pulse>
            All Systems Operational
          </StatusBadge>
        </div>
      </div>
    </header>
  );
}
