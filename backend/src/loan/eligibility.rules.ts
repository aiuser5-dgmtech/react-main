export interface EligibilityResult {
  eligible: boolean;
  minimumCreditScore: number;
  message: string;
}

export class EligibilityRulesEngine {
  private readonly minimumCreditScore = 600;

  calculateEligibility(applicantId: string, applicantCreditScore: number): EligibilityResult {
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
