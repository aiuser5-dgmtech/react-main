import { useState } from 'react';
import type { LoanHistoryItem } from '../types/loan-types';

export function useLoanHistory() {
  const [history, setHistory] = useState<LoanHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async (applicantId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/loans/history/${applicantId}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as LoanHistoryItem[];
      setHistory(data);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to fetch loan history';
      setError(message);
      setHistory([]);
      throw error instanceof Error ? error : new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { history, loading, error, fetchHistory };
}