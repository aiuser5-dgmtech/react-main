export interface LoanRequest {
  applicantId: string;
  requestedAmount: number;
  creditScore: number;
  annualIncome: number;
  employmentStatus: 'SALARIED' | 'SELF_EMPLOYED' | 'UNEMPLOYED' | 'RETIRED';
}

export interface LoanDecision {
  applicantId: string;
  status: 'APPROVED' | 'REJECTED';
  interestRate: number | null;
  reason: string;
}

export interface LoanHistoryItem {
  applicantId: string;
  loanId: string;
  amount: number;
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
  submittedAt: string;
  decision?: LoanDecision;
}