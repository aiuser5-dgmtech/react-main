---
applyTo: "backend/**/*.ts"
---
# Express TypeScript Standards

- Route handlers must be thin — all logic in service functions.
- Always type request body: req.body as MyType — never implicit any.
- Always handle async errors — wrap in try/catch or use asyncHandler middleware.
- NEVER console.log — use pino logger.
- All service functions must be typed: explicit parameter types and return types.
- Shared types imported from loan.types.ts — never redeclare in route files.