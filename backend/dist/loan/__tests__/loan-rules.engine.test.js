"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loan_rules_engine_1 = require("../loan-rules.engine");
const engine = new loan_rules_engine_1.LoanRulesEngine();
const baseRequest = {
    applicantId: 'APP001',
    requestedAmount: 100000,
    annualIncome: 800000,
    employmentStatus: 'SALARIED',
    creditScore: 720,
};
describe('LoanRulesEngine', () => {
    it('rejects when creditScore is missing (null)', () => {
        const result = engine.evaluate({ ...baseRequest, creditScore: null });
        expect(result.status).toBe('REJECTED');
        expect(result.reason).toBe('Credit score missing');
        expect(result.interestRate).toBeNull();
    });
    it('approves with 7.5% for creditScore >= 750 (excellent profile)', () => {
        const result = engine.evaluate({ ...baseRequest, creditScore: 750 });
        expect(result.status).toBe('APPROVED');
        expect(result.interestRate).toBe(7.5);
        expect(result.reason).toBe('Excellent profile');
    });
    it('approves with 12% for creditScore >= 600 (standard profile)', () => {
        const result = engine.evaluate({ ...baseRequest, creditScore: 650 });
        expect(result.status).toBe('APPROVED');
        expect(result.interestRate).toBe(12);
        expect(result.reason).toBe('Standard profile');
    });
    it('rejects when creditScore < 600 (too low)', () => {
        const result = engine.evaluate({ ...baseRequest, creditScore: 550 });
        expect(result.status).toBe('REJECTED');
        expect(result.reason).toBe('Credit score too low');
        expect(result.interestRate).toBeNull();
    });
    it('returns applicantId in the decision', () => {
        const result = engine.evaluate(baseRequest);
        expect(result.applicantId).toBe('APP001');
    });
});
