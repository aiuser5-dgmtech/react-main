"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pino_1 = __importDefault(require("pino"));
const zod_1 = require("zod");
const loan_rules_engine_1 = require("./loan/loan-rules.engine");
const loan_evaluation_service_1 = require("./loan/loan-evaluation.service");
const logger = (0, pino_1.default)({ name: 'loan-api' });
const engine = new loan_rules_engine_1.LoanRulesEngine();
const service = new loan_evaluation_service_1.LoanEvaluationService(engine);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/loans/evaluate', (req, res) => {
    const decision = service.evaluate(req.body);
    res.json(decision);
});
app.get('/api/loans/history/:id', (req, res) => {
    const history = service.getHistory(req.params.id);
    res.json(history);
});
app.get('/api/loans/:applicantId/eligibility-summary', (req, res) => {
    try {
        const { applicantId } = req.params;
        const creditScoreParam = req.query.creditScore;
        const creditScoreSchema = zod_1.z.coerce.number().int().positive();
        const creditScore = creditScoreSchema.parse(creditScoreParam);
        const summary = service.getEligibilitySummary(applicantId, creditScore);
        res.json(summary);
    }
    catch (error) {
        const typedError = error instanceof Error ? error : new Error('Request validation failed');
        logger.error({ err: typedError }, 'Eligibility summary request failed');
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: 'Invalid creditScore query parameter' });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
app.listen(3001, () => logger.info('Loan API running on port 3001'));
