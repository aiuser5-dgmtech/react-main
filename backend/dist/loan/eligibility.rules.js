"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityRulesEngine = void 0;
class EligibilityRulesEngine {
    constructor() {
        this.minimumCreditScore = 600;
    }
    calculateEligibility(applicantId, applicantCreditScore) {
        const eligible = applicantCreditScore >= this.minimumCreditScore;
        const message = eligible
            ? `Applicant ${applicantId} is eligible for a loan. Credit score: ${applicantCreditScore}`
            : `Applicant ${applicantId} is not eligible for a loan. Credit score: ${applicantCreditScore} is below the minimum requirement of ${this.minimumCreditScore}`;
        return {
            eligible,
            minimumCreditScore: this.minimumCreditScore,
            message,
        };
    }
}
exports.EligibilityRulesEngine = EligibilityRulesEngine;
