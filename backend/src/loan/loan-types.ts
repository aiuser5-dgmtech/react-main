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