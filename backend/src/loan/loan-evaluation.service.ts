import pino from 'pino';
import type { LoanDecision, LoanHistoryItem, LoanRequest } from './loan-types';
import type { LoanRulesEngine } from './loan-rules.engine';
import { EligibilityRulesEngine } from './eligibility.rules';
import { EligibilitySummaryResponseSchema, type EligibilitySummaryResponse } from './eligibility.schema';

const logger = pino({ name: 'loan-evaluation-service' });

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

export class LoanEvaluationService {
  private readonly rulesEngine: LoanRulesEngine;
  private readonly eligibilityEngine: EligibilityRulesEngine;

  constructor(rulesEngine: LoanRulesEngine) {
    this.rulesEngine = rulesEngine;
    this.eligibilityEngine = new EligibilityRulesEngine();
  }

  evaluate(request: LoanRequest): LoanDecision {
    logger.info(
      {
        applicantId: request.applicantId,
        requestedAmount: request.requestedAmount,
        creditScore: request.creditScore,
        annualIncome: request.annualIncome,
        employmentStatus: request.employmentStatus,
      },
      'Evaluating loan request',
    );

    try {
      const decision = this.rulesEngine.evaluate(request);

      if (decision.status === 'APPROVED') {
        logger.info(
          { applicantId: request.applicantId, status: decision.status, interestRate: decision.interestRate },
          'Loan approved'
        );
      } else {
        logger.warn(
          { applicantId: request.applicantId, status: decision.status, reason: decision.reason },
          'Loan rejected'
        );
      }

      return decision;
    } catch (error: unknown) {
      const typedError = error instanceof Error ? error : new Error('Loan evaluation failed');

      logger.error({ err: typedError, applicantId: request.applicantId }, 'Failed to evaluate loan request');

      throw typedError;
    }
  }

  getHistory(applicantId: string): LoanHistoryItem[] {
    logger.info({ applicantId }, 'Fetching loan history');
    return loanHistoryByApplicant[applicantId] ?? [];
  }

  getEligibilitySummary(applicantId: string, applicantCreditScore: number): EligibilitySummaryResponse {
    logger.info({ applicantId, applicantCreditScore }, 'Calculating eligibility summary');

    try {
      const eligibilityResult = this.eligibilityEngine.calculateEligibility(applicantId, applicantCreditScore);

      const response: EligibilitySummaryResponse = {
        eligible: eligibilityResult.eligible,
        minimumCreditScore: eligibilityResult.minimumCreditScore,
        applicantScore: applicantCreditScore,
        message: eligibilityResult.message,
      };

      const validated = EligibilitySummaryResponseSchema.parse(response);

      logger.info({ applicantId, eligible: validated.eligible }, 'Eligibility summary calculated');

      return validated;
    } catch (error: unknown) {
      const typedError = error instanceof Error ? error : new Error('Failed to calculate eligibility summary');

      logger.error({ err: typedError, applicantId }, 'Failed to calculate eligibility summary');

      throw typedError;
    }
  }
}
