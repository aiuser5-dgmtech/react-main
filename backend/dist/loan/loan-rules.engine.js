"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRulesEngine = void 0;
class LoanRulesEngine {
    evaluate(request) {
        if (request.creditScore == null) {
            return {
                applicantId: request.applicantId,
                status: 'REJECTED',
                interestRate: null,
                reason: 'Credit score missing',
            };
        }
        if (request.creditScore >= 750) {
            return {
                applicantId: request.applicantId,
                status: 'APPROVED',
                interestRate: 7.5,
                reason: 'Excellent profile',
            };
        }
        if (request.creditScore >= 600) {
            return {
                applicantId: request.applicantId,
                status: 'APPROVED',
                interestRate: 12.0,
                reason: 'Standard profile',
            };
        }
        return {
            applicantId: request.applicantId,
            status: 'REJECTED',
            interestRate: null,
            reason: 'Credit score too low',
        };
    }
}
exports.LoanRulesEngine = LoanRulesEngine;
