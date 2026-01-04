import { useEffect, useState } from 'react';
import { apiClient, type Metric } from '../lib/api';

export function useMetrics(metricType?: string, limit: number = 100) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiClient.getMetrics(metricType, limit);
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
        setMetrics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchMetrics, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [metricType, limit]);

  return { metrics, loading, error };
}
