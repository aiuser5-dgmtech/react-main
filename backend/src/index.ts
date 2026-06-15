import express from 'express';
import cors from 'cors';
import { LoanRulesEngine } from './loan/loan-rules.engine';
import { LoanEvaluationService } from './loan/loan-evaluation.service';
import type { LoanRequest } from './loan/loan-types';

const engine = new LoanRulesEngine();
const service = new LoanEvaluationService(engine);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/loans/evaluate', (req, res) => {
  const decision = service.evaluate(req.body as LoanRequest);
  res.json(decision);
});

app.get('/api/loans/history/:id', (req, res) => {
  const history = service.getHistory(req.params.id);
  res.json(history);
});

app.listen(3001, () => console.log('Loan API running on port 3001'));