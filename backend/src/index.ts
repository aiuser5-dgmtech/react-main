import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { z } from 'zod';
import { LoanRulesEngine } from './loan/loan-rules.engine';
import { LoanEvaluationService } from './loan/loan-evaluation.service';
import type { LoanRequest } from './loan/loan-types';

const logger = pino({ name: 'loan-api' });

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

app.get('/api/loans/:applicantId/eligibility-summary', (req, res) => {
  try {
    const { applicantId } = req.params;
    const creditScoreParam = req.query.creditScore;

    const creditScoreSchema = z.coerce.number().int().positive();
    const creditScore = creditScoreSchema.parse(creditScoreParam);

    const summary = service.getEligibilitySummary(applicantId, creditScore);
    res.json(summary);
  } catch (error: unknown) {
    const typedError = error instanceof Error ? error : new Error('Request validation failed');

    logger.error({ err: typedError }, 'Eligibility summary request failed');

    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid creditScore query parameter' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(3001, () => logger.info('Loan API running on port 3001'));