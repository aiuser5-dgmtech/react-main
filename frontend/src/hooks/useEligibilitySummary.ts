import { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import type { EligibilitySummaryResponse } from '../types/loan-types';

interface UseEligibilitySummaryResult {
  summary: EligibilitySummaryResponse | null;
  loading: boolean;
  error: string | null;
  fetchSummary: (creditScore: number) => Promise<EligibilitySummaryResponse>;
}

export function useEligibilitySummary(applicantId: string): UseEligibilitySummaryResult {
  const [summary, setSummary] = useState<EligibilitySummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (creditScore: number): Promise<EligibilitySummaryResponse> => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/api/loans/${applicantId}/eligibility-summary?creditScore=${creditScore}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as EligibilitySummaryResponse;
      setSummary(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to fetch eligibility summary';
      setError(message);
      setSummary(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, error, fetchSummary };
}
