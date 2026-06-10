import express from 'express';
import cors from 'cors';
import { evaluateLoan } from './loan/loan.service';
import type { LoanRequest } from './loan/loan-types';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/loans/evaluate', (req, res) => {
  const decision = evaluateLoan(req.body as LoanRequest);
  res.json(decision);
});

app.listen(3001, () => console.log('Loan API running on port 3001'));