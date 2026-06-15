# AGENTS.md — loan-approval-react

## Service Overview
Full-stack loan approval application.
Backend: Express + TypeScript REST API (port 3001)
Frontend: React 18 with TypeScript, Vite build, functional components only.
Both in the same monorepo.

## Build Commands
  cd backend && npm run build       # compile Express TypeScript
  cd backend && npm run dev         # dev server (nodemon)
  cd frontend && npm run build      # Vite production build
  cd frontend && npm test           # Jest tests

## Architecture Rules — Backend (Express)
- Route handlers: thin — delegate immediately to service functions.
- Services: pure functions or classes. No Express types inside services.
- Types: all shared types in src/loan/loan.types.ts — import from there.
- NEVER console.log — use pino logger.
- All async functions must have try/catch.

## Architecture Rules — Frontend (React)
- Functional components ONLY. NEVER class components.
- Custom hooks for all data fetching — never fetch inside a component directly.
- All hooks must be named exports, not default exports.
- NEVER use `any` type — type everything explicitly.
- State: useState with generic types — useState<Type | null>(null) always.
- useEffect cleanup: always return a cleanup function or abort controller.
- Props: always defined as an interface named ComponentNameProps.

## TypeScript Standards (both projects)
- strict: true. No implicit any. No type assertions with `as` unless verified.
- Prefer type narrowing over casting.
- Interfaces for object shapes. Type aliases for unions.
- No `@ts-ignore` or `@ts-expect-error` without explanation comment.

## Domain
- LoanRequest: applicantId, requestedAmount, creditScore, annualIncome, employmentStatus
- LoanDecision: applicantId, status (APPROVED|REJECTED), interestRate (number|null), reason
- Types live in: frontend/src/types/loan.types.ts and backend/src/loan/loan.types.ts