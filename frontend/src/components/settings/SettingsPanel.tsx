import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Settings, Bell, Eye, Zap, Lock, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { StatusBadge } from '../ui/StatusBadge';

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState({
    notifications: {
      alerts: true,
      dailyReport: true,
      agentUpdates: true,
      roiThreshold: 10,
    },
    display: {
      theme: 'dark',
      refreshInterval: 5000,
      animationsEnabled: true,
    },
    performance: {
      maxAgents: 8,
      dataRetention: 30,
      cacheDuration: 300,
    },
    security: {
      twoFactor: false,
      ipWhitelist: false,
      apiKeyRotation: 90,
    },
  });

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Eye },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'api', label: 'API', icon: BarChart3 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">Alert Notifications</h4>
                <p className="text-sm text-gray-400">Receive alerts for important events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.alerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, alerts: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">Daily Report</h4>
                <p className="text-sm text-gray-400">Email daily performance summary</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.dailyReport}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, dailyReport: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">Agent Updates</h4>
                <p className="text-sm text-gray-400">Receive agent status changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.agentUpdates}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, agentUpdates: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
              </label>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h4 className="font-medium text-white">ROI Threshold Alert</h4>
                  <p className="text-sm text-gray-400">Alert when ROI drops below percentage</p>
                </div>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.notifications.roiThreshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, roiThreshold: parseInt(e.target.value) },
                  })
                }
                className="w-full mt-3"
              />
              <div className="text-right text-sm text-[#00F3FF] font-mono mt-1">
                {settings.notifications.roiThreshold}%
              </div>
            </div>
          </div>
        );

      case 'display':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-white mb-2">Theme</h4>
              <div className="flex gap-2">
                {['dark', 'light'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() =>
                      setSettings({ ...settings, display: { ...settings.display, theme } })
                    }
                    className={`px-4 py-2 rounded-lg capitalize transition-all ${
                      settings.display.theme === theme
                        ? 'bg-[#0066FF] text-white'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-white mb-2">Refresh Interval (ms)</h4>
              <input
                type="number"
                value={settings.display.refreshInterval}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    display: { ...settings.display, refreshInterval: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 rounded-lg text-white border border-white/20 focus:border-[#00F3FF] outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">Data refresh frequency</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">Enable Animations</h4>
                <p className="text-sm text-gray-400">Disable for lower-end devices</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.display.animationsEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      display: { ...settings.display, animationsEnabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
              </label>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-white mb-2">Max Active Agents</h4>
              <input
                type="number"
                min="1"
                max="20"
                value={settings.performance.maxAgents}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    performance: { ...settings.performance, maxAgents: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 rounded-lg text-white border border-white/20 focus:border-[#00F3FF] outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">Maximum concurrent agents</p>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-white mb-2">Data Retention (days)</h4>
              <input
                type="number"
                min="7"
                max="365"
                value={settings.performance.dataRetention}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    performance: { ...settings.performance, dataRetention: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 rounded-lg text-white border border-white/20 focus:border-[#00F3FF] outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">How long to keep historical data</p>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-white mb-2">Cache Duration (seconds)</h4>
              <input
                type="number"
                min="60"
                max="3600"
                value={settings.performance.cacheDuration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    performance: { ...settings.performance, cacheDuration: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 rounded-lg text-white border border-white/20 focus:border-[#00F3FF] outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">Query cache duration</p>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400">Extra security layer for account access</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, twoFactor: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">IP Whitelist</h4>
                <p className="text-sm text-gray-400">Restrict access to specific IPs</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.ipWhitelist}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, ipWhitelist: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
              </label>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-white mb-2">API Key Rotation (days)</h4>
              <input
                type="number"
                min="30"
                max="365"
                value={settings.security.apiKeyRotation}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, apiKeyRotation: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 rounded-lg text-white border border-white/20 focus:border-[#00F3FF] outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">Auto-rotate API keys every N days</p>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-4">
            <GlassCard className="bg-[#00F3FF]/5 border-[#00F3FF]/40">
              <h4 className="font-bold text-white mb-2">API Key</h4>
              <div className="flex items-center gap-2 mb-2">
                <code className="flex-1 px-3 py-2 bg-black/40 rounded text-[#00F3FF] font-mono text-sm overflow-x-auto">
                  sk_live_••••••••••••••••••••
                </code>
                <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors text-white text-sm">
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-400">Last used: 2 hours ago</p>
            </GlassCard>

            <GlassCard>
              <h4 className="font-bold text-white mb-3">API Usage</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">This month</span>
                    <span className="text-white font-mono">14,242 / 100,000</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00F3FF]" style={{ width: '14.2%' }} />
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary">Generate New Key</Button>
              <Button variant="ghost">View Documentation</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Settings className="w-8 h-8 text-[#00F3FF]" />
        <div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-gray-400">Manage system configuration and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <GlassCard className="h-fit">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#0066FF] text-white'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <TabIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-3">
          <GlassCard>{renderTabContent()}</GlassCard>

          <div className="mt-6 flex gap-3 justify-end">
            <Button variant="secondary">Discard Changes</Button>
            <Button variant="primary">Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
