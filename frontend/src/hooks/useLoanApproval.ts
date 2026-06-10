import { useState } from 'react';
import type { LoanDecision, LoanRequest } from '../types/loan-types';

export function useLoanApproval() {
  const [decision, setDecision] = useState<LoanDecision | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const evaluate = async (request: LoanRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/loans/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as LoanDecision;
      setDecision(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to evaluate loan';
      setError(message);
      setDecision(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { decision, loading, error, evaluate };
}