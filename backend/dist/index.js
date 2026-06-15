"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const loan_rules_engine_1 = require("./loan/loan-rules.engine");
const loan_evaluation_service_1 = require("./loan/loan-evaluation.service");
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
app.listen(3001, () => console.log('Loan API running on port 3001'));
