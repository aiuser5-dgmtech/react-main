import { z } from 'zod';

export const EligibilitySummaryResponseSchema = z.object({
  eligible: z.boolean(),
  minimumCreditScore: z.number().int().positive(),
  applicantScore: z.number().int().nonnegative(),
  message: z.string(),
});

export type EligibilitySummaryResponse = z.infer<typeof EligibilitySummaryResponseSchema>;
