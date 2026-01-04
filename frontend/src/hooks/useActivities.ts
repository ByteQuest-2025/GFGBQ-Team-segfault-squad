import { useEffect, useState } from 'react';
import { apiClient, type Activity } from '../lib/api';

export function useActivities(agentId?: string, limit: number = 50) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await apiClient.getActivities(agentId, limit);
        setActivities(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activities');
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    // Poll for updates every 3 seconds
    const interval = setInterval(fetchActivities, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [agentId, limit]);

  return { activities, loading, error };
}
