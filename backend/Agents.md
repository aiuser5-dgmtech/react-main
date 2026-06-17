# AGENTS.md — backend (Express)

Root AGENTS.md applies. This adds Express specifics and ONE override.

## EXPLICIT OVERRIDE: Logging Level for Loan Rejections

This section overrides the root logging rule for loan decision outcomes.

### Effective Rules
- APPROVED loan decisions MUST be logged at INFO level.
- REJECTED loan decisions MUST be logged at WARN level.
- REJECTED loan decisions MUST NOT be logged only at INFO level.
- When a loan is rejected, include the rejection reason in the WARN log message.

Example:
```typescript
if (decision.status === 'REJECTED') {
  logger.warn({ applicantId, reason: decision.reason }, 'Loan rejected');
} else {
  logger.info({ applicantId, status: decision.status }, 'Loan decision');
}