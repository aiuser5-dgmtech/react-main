
### `frontend/AGENTS.md`:

```markdown
# AGENTS.md — frontend (React)

Root AGENTS.md applies.

## React Specifics
- Functional components only, named exports
- Custom hooks for all data fetching, typed with generics
- useState<Type | null>(null) always typed
- catchError equivalent: try/catch/finally in hooks