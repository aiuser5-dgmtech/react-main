import type { LoanDecision, LoanRequest } from './loan-types';

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