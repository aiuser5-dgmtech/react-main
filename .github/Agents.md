# AGENTS.md — loan-approval-react (root)

## Repository Structure
- backend/  — Express + TypeScript REST API (port 3001)
- frontend/ — React 18 + TypeScript, Vite

### AGENTS.md Hierarchy
When working with any file:
- Identify all AGENTS.md files that apply to that file.
- Apply instructions from the repository root AGENTS.md first.
- Apply instructions from nested AGENTS.md files next.
- If instructions conflict, the MOST SPECIFIC (nearest) AGENTS.md takes precedence.
- A nested AGENTS.md may override, replace, or narrow rules from parent AGENTS.md files.

When answering questions about a specific file, ALWAYS resolve instructions
using the nearest applicable AGENTS.md.

## Universal Rules
- NEVER commit secrets or .env files
- NEVER log PII: applicant names, PAN numbers, mobile numbers, exact credit scores
- Log business events at INFO level.
- Conventional Commits: feat:, fix:, chore:, docs:, refactor:

## Build Commands
cd backend && npm run build && npm test
cd frontend && npm run build

## See Also
- backend/AGENTS.md
- frontend/AGENTS.md