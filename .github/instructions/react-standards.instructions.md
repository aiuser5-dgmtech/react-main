---
applyTo: "frontend/**/*.{ts,tsx}"
---
# React TypeScript Standards

- Functional components only. No class components ever.
- Named exports only. No default exports from component files.
- Props interface: always typed as `interface ComponentNameProps`.
- useState always typed: useState<Type | null>(null) — never useState(null).
- Custom hooks: prefix with `use`, named export, return typed object.
- useEffect: always include dependency array. Always return cleanup if subscribing.
- NEVER use `any`. Use `unknown` and narrow, or define the correct type.
- fetch calls only in custom hooks, never inside component bodies.