import { useEffect, useState } from 'react';
import { apiClient, type Campaign } from '../lib/api';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await apiClient.getCampaigns();
        setCampaigns(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchCampaigns, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { campaigns, loading, error };
}
