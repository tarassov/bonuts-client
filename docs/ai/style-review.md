You are reviewing a React project that uses MUI with the following styling rules:

STYLING RULES
1. CSS Modules are used ONLY for:
    - Page-level layout
    - Complex grids and scaffolding
    - Major structural sections (page, sidebar, content, header)
    - Responsive layout logic

2. MUI `styled()` is used ONLY for:
    - Reusable, semantic components
    - Design-system components
    - Components with identity and a clear name
    - Base visual structure of reusable UI elements

3. MUI `sx` prop is used ONLY for:
    - Small, local, instance-level tweaks
    - Padding, margin, spacing
    - Minor layout adjustments
    - One-off responsive overrides

ADDITIONAL CONSTRAINTS
- A single styling concern must not be handled by more than one system
- CSS Modules must NOT style MUI internals or override MUI-generated classes
- `sx` must not define component identity or reusable styles
- Repeated `sx` patterns should be extracted
- Layout styles must not be duplicated across systems

YOUR TASK
Review the provided project/code and determine whether it follows the rules above.

For your response:
1. Identify any violations, grouped by rule (CSS Modules / styled / sx)
2. Explain WHY each issue is a problem
3. Suggest a concrete refactor for each issue
4. Call out anything that is done particularly well
5. Give an overall verdict:
    - ✅ Fully compliant
    - ⚠️ Mostly compliant with minor issues
    - ❌ Not compliant

Be strict, practical, and opinionated.
Assume this is a production codebase and long-term maintainability matters.
