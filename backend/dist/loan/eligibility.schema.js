"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilitySummaryResponseSchema = void 0;
const zod_1 = require("zod");
exports.EligibilitySummaryResponseSchema = zod_1.z.object({
    eligible: zod_1.z.boolean(),
    minimumCreditScore: zod_1.z.number().int().positive(),
    applicantScore: zod_1.z.number().int().nonnegative(),
    message: zod_1.z.string(),
});
