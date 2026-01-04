import { useEffect, useState } from 'react';
import { apiClient, type Agent } from '../lib/api';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await apiClient.getAgents();
        setAgents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch agents');
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();

    // Poll for updates every 3 seconds
    const interval = setInterval(fetchAgents, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { agents, loading, error };
}
