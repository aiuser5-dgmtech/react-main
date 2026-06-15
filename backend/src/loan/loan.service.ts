import type { LoanDecision, LoanHistoryItem, LoanRequest } from './loan-types';

const loanHistoryByApplicant: Record<string, LoanHistoryItem[]> = {
  APP001: [
    {
      applicantId: 'APP001',
      loanId: 'LN-1001',
      amount: 100000,
      status: 'APPROVED',
      submittedAt: '2026-06-01T10:00:00.000Z',
      decision: {
        applicantId: 'APP001',
        status: 'APPROVED',
        interestRate: 12,
        reason: 'Standard profile',
      },
    },
    {
      applicantId: 'APP001',
      loanId: 'LN-1002',
      amount: 50000,
      status: 'PENDING',
      submittedAt: '2026-06-05T15:30:00.000Z',
    },
  ],
  APP002: [
    {
      applicantId: 'APP002',
      loanId: 'LN-2001',
      amount: 250000,
      status: 'REJECTED',
      submittedAt: '2026-05-28T09:15:00.000Z',
      decision: {
        applicantId: 'APP002',
        status: 'REJECTED',
        interestRate: null,
        reason: 'Credit score too low',
      },
    },
  ],
};

export function evaluateLoan(request: LoanRequest): LoanDecision {
  if (request.creditScore == null) {
    return { applicantId: request.applicantId, status: 'REJECTED', interestRate: null, reason: 'Credit score missing' };
  }
  if (request.creditScore >= 750) {
    return { applicantId: request.applicantId, status: 'APPROVED', interestRate: 7.5, reason: 'Excellent profile' };
  }
  if (request.creditScore >= 600) {
    return { applicantId: request.applicantId, status: 'APPROVED', interestRate: 12.0, reason: 'Standard profile' };
  }
  return { applicantId: request.applicantId, status: 'REJECTED', interestRate: null, reason: 'Credit score too low' };
}

export function getLoanHistory(applicantId: string): LoanHistoryItem[] {
  return loanHistoryByApplicant[applicantId] ?? [];
}