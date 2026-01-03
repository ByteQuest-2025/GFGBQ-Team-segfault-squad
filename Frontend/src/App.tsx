import { useState } from 'react';
import { Header } from './components/layout/Header';
import { MetricsGrid } from './components/dashboard/MetricsGrid';
import { AgentNetwork } from './components/dashboard/AgentNetwork';
import { AgentControlPanel } from './components/agents/AgentControlPanel';
import { CampaignOptimization } from './components/campaigns/CampaignOptimization';
import { AudienceIntelligence } from './components/audience/AudienceIntelligence';
import { MarketTrends } from './components/trends/MarketTrends';
import { Activity, Users, Target, TrendingUp, Eye, Menu, X } from 'lucide-react';

type View = 'dashboard' | 'agents' | 'campaigns' | 'audience' | 'trends';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard' as View, label: 'Command Dashboard', icon: Activity },
    { id: 'agents' as View, label: 'Agent Control', icon: Users },
    { id: 'campaigns' as View, label: 'Campaigns', icon: Target },
    { id: 'audience' as View, label: 'Audience Intel', icon: Eye },
    { id: 'trends' as View, label: 'Market Trends', icon: TrendingUp },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <MetricsGrid />
            <AgentNetwork />
          </>
        );
      case 'agents':
        return <AgentControlPanel />;
      case 'campaigns':
        return <CampaignOptimization />;
      case 'audience':
        return <AudienceIntelligence />;
      case 'trends':
        return <MarketTrends />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass-card m-4 p-6 transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <h2 className="text-lg font-bold text-white">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentView === item.id
                      ? 'bg-[#0066FF] text-white shadow-lg'
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="text-xs text-gray-500 mb-2">System Status</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="text-white font-mono">99.98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">API Calls</span>
                <span className="text-white font-mono">142.5K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Latency</span>
                <span className="text-[#00FF9D] font-mono">23ms</span>
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 md:p-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 glass-card text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Header />
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
