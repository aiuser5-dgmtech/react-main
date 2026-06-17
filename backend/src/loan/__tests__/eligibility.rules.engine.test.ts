import { EligibilityRulesEngine } from '../eligibility.rules';

describe('EligibilityRulesEngine', () => {
  const engine = new EligibilityRulesEngine();

  test('should be eligible when creditScore >= 600', () => {
    const result = engine.calculateEligibility('APP001', 600);
    expect(result.eligible).toBe(true);
    expect(result.minimumCreditScore).toBe(600);
    expect(result.message).toContain('eligible for a loan');
  });

  test('should be not eligible when creditScore < 600', () => {
    const result = engine.calculateEligibility('APP002', 599);
    expect(result.eligible).toBe(false);
    expect(result.minimumCreditScore).toBe(600);
    expect(result.message).toContain('not eligible for a loan');
    expect(result.message).toContain('below the minimum requirement');
  });

  test('should have correct minimumCreditScore value', () => {
    const result1 = engine.calculateEligibility('APP001', 700);
    expect(result1.minimumCreditScore).toBe(600);

    const result2 = engine.calculateEligibility('APP002', 500);
    expect(result2.minimumCreditScore).toBe(600);
  });

  test('should have correct message values', () => {
    const eligibleResult = engine.calculateEligibility('APP001', 750);
    expect(eligibleResult.message).toContain('APP001');
    expect(eligibleResult.message).toContain('750');

    const ineligibleResult = engine.calculateEligibility('APP002', 550);
    expect(ineligibleResult.message).toContain('APP002');
    expect(ineligibleResult.message).toContain('550');
  });
});
