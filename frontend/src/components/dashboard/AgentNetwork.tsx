import { useEffect, useRef, useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Brain, Target, TrendingUp, Users, Zap, Eye, MessageSquare, BarChart } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  x: number;
  y: number;
  icon: string;
  status: 'active' | 'idle' | 'processing';
  connections: string[];
}

interface Particle {
  id: string;
  fromAgent: string;
  toAgent: string;
  progress: number;
}

export function AgentNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const agents: Agent[] = [
    { id: 'behavioral', name: 'User Behavior', x: 150, y: 150, icon: 'users', status: 'active', connections: ['content', 'engagement'] },
    { id: 'content', name: 'Content Optimizer', x: 400, y: 100, icon: 'message', status: 'processing', connections: ['engagement', 'conversion'] },
    { id: 'engagement', name: 'Engagement AI', x: 400, y: 250, icon: 'zap', status: 'active', connections: ['conversion'] },
    { id: 'conversion', name: 'Conversion Agent', x: 650, y: 150, icon: 'target', status: 'active', connections: ['roi'] },
    { id: 'roi', name: 'ROI Analyzer', x: 900, y: 150, icon: 'trending', status: 'processing', connections: [] },
    { id: 'audience', name: 'Audience Intel', x: 250, y: 320, icon: 'eye', status: 'active', connections: ['content', 'engagement'] },
    { id: 'market', name: 'Market Trends', x: 650, y: 320, icon: 'chart', status: 'idle', connections: ['roi'] },
    { id: 'creative', name: 'Creative AI', x: 150, y: 280, icon: 'brain', status: 'active', connections: ['content'] },
  ];

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      users: <Users className="w-5 h-5" />,
      message: <MessageSquare className="w-5 h-5" />,
      zap: <Zap className="w-5 h-5" />,
      target: <Target className="w-5 h-5" />,
      trending: <TrendingUp className="w-5 h-5" />,
      eye: <Eye className="w-5 h-5" />,
      chart: <BarChart className="w-5 h-5" />,
      brain: <Brain className="w-5 h-5" />,
    };
    return icons[iconName] || icons.brain;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      agents.forEach((agent) => {
        agent.connections.forEach((targetId) => {
          const target = agents.find((a) => a.id === targetId);
          if (!target) return;

          const gradient = ctx.createLinearGradient(agent.x, agent.y, target.x, target.y);
          gradient.addColorStop(0, 'rgba(0, 243, 255, 0.2)');
          gradient.addColorStop(1, 'rgba(0, 243, 255, 0.05)');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(agent.x, agent.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      });

      particles.forEach((particle) => {
        const fromAgent = agents.find((a) => a.id === particle.fromAgent);
        const toAgent = agents.find((a) => a.id === particle.toAgent);
        if (!fromAgent || !toAgent) return;

        const x = fromAgent.x + (toAgent.x - fromAgent.x) * particle.progress;
        const y = fromAgent.y + (toAgent.y - fromAgent.y) * particle.progress;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00F3FF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F3FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const particleInterval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      if (randomAgent.connections.length > 0) {
        const targetId = randomAgent.connections[Math.floor(Math.random() * randomAgent.connections.length)];
        const newParticle: Particle = {
          id: Math.random().toString(),
          fromAgent: randomAgent.id,
          toAgent: targetId,
          progress: 0
        };
        setParticles(prev => [...prev, newParticle]);
      }
    }, 800);

    const progressInterval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, progress: p.progress + 0.02 }))
          .filter(p => p.progress < 1)
      );
    }, 50);

    return () => {
      clearInterval(particleInterval);
      clearInterval(progressInterval);
    };
  }, [particles]);

  return (
    <GlassCard className="mb-8 relative overflow-hidden">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-1">AI Agent Collaboration Network</h2>
        <p className="text-sm text-gray-400">Real-time data flow and decision orchestration</p>
      </div>

      <div className="relative h-[400px] bg-black/20 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1100}
          height={400}
          className="absolute inset-0"
        />

        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`absolute cursor-pointer transition-all duration-300 ${selectedAgent === agent.id ? 'scale-125 z-10' : 'hover:scale-110'
              }`}
            style={{
              left: `${agent.x - 30}px`,
              top: `${agent.y - 30}px`,
            }}
            onClick={() => setSelectedAgent(agent.id === selectedAgent ? null : agent.id)}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center border-2 backdrop-blur-md ${agent.status === 'active'
                  ? 'bg-[#00F3FF]/20 border-[#00F3FF] animate-pulse-subtle'
                  : agent.status === 'processing'
                    ? 'bg-[#00FF9D]/20 border-[#00FF9D]'
                    : 'bg-white/10 border-white/30'
                }`}
              style={{
                boxShadow: agent.status === 'active' ? '0 0 20px rgba(0, 243, 255, 0.4)' : 'none'
              }}
            >
              <div className={agent.status === 'active' ? 'text-[#00F3FF]' : agent.status === 'processing' ? 'text-[#00FF9D]' : 'text-white'}>
                {getIcon(agent.icon)}
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="text-xs font-medium text-center text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                {agent.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAgent && (
        <div className="mt-4 p-4 bg-[#00F3FF]/10 border border-[#00F3FF]/30 rounded-lg animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="text-[#00F3FF]">
              {getIcon(agents.find(a => a.id === selectedAgent)?.icon || 'brain')}
            </div>
            <div>
              <h3 className="font-bold text-white">{agents.find(a => a.id === selectedAgent)?.name}</h3>
              <p className="text-sm text-gray-400">Status: {agents.find(a => a.id === selectedAgent)?.status}</p>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
