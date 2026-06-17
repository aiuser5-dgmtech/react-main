"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanEvaluationService = void 0;
const pino_1 = __importDefault(require("pino"));
const eligibility_rules_1 = require("./eligibility.rules");
const eligibility_schema_1 = require("./eligibility.schema");
const logger = (0, pino_1.default)({ name: 'loan-evaluation-service' });
const loanHistoryByApplicant = {
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
class LoanEvaluationService {
    constructor(rulesEngine) {
        this.rulesEngine = rulesEngine;
        this.eligibilityEngine = new eligibility_rules_1.EligibilityRulesEngine();
    }
    evaluate(request) {
        logger.info({
            applicantId: request.applicantId,
            requestedAmount: request.requestedAmount,
            creditScore: request.creditScore,
            annualIncome: request.annualIncome,
            employmentStatus: request.employmentStatus,
        }, 'Evaluating loan request');
        try {
            const decision = this.rulesEngine.evaluate(request);
            logger.info({ applicantId: request.applicantId, status: decision.status }, 'Loan evaluation complete');
            return decision;
        }
        catch (error) {
            const typedError = error instanceof Error ? error : new Error('Loan evaluation failed');
            logger.error({ err: typedError, applicantId: request.applicantId }, 'Failed to evaluate loan request');
            throw typedError;
        }
    }
    getHistory(applicantId) {
        logger.info({ applicantId }, 'Fetching loan history');
        return loanHistoryByApplicant[applicantId] ?? [];
    }
    getEligibilitySummary(applicantId, applicantCreditScore) {
        logger.info({ applicantId, applicantCreditScore }, 'Calculating eligibility summary');
        try {
            const eligibilityResult = this.eligibilityEngine.calculateEligibility(applicantId, applicantCreditScore);
            const response = {
                eligible: eligibilityResult.eligible,
                minimumCreditScore: eligibilityResult.minimumCreditScore,
                applicantScore: applicantCreditScore,
                message: eligibilityResult.message,
            };
            const validated = eligibility_schema_1.EligibilitySummaryResponseSchema.parse(response);
            logger.info({ applicantId, eligible: validated.eligible }, 'Eligibility summary calculated');
            return validated;
        }
        catch (error) {
            const typedError = error instanceof Error ? error : new Error('Failed to calculate eligibility summary');
            logger.error({ err: typedError, applicantId }, 'Failed to calculate eligibility summary');
            throw typedError;
        }
    }
}
exports.LoanEvaluationService = LoanEvaluationService;
