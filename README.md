# GUARDRAIL Styling Foundations

This workspace contains the global styling foundation for the GUARDRAIL website:

- `tailwind.config.ts` defines the brand palette, typography scale, layout spacing, hairline borders, and premium utility tokens.
- `src/styles/globals.css` provides CSS variables, global type treatment, page background, and reusable composition classes for vault-like enterprise pages.
- `src/components/GuardrailHero.tsx` provides the animated React/Tailwind/Framer Motion hero section.
- `src/components/ServicesAuditsSection.tsx` provides the sticky-scroll services and audits section.

The visual system is intentionally restrained: midnight navy, crisp white, slate, silver, platinum, generous whitespace, editorial typography, and ultra-thin dividers.

Use the hero in a React or Next.js app with:

```tsx
import GuardrailHero from "@/components/GuardrailHero";
import ServicesAuditsSection from "@/components/ServicesAuditsSection";

export default function Page() {
  return (
    <>
      <GuardrailHero />
      <ServicesAuditsSection />
    </>
  );
}
```

Required runtime packages: `react`, `tailwindcss`, and `framer-motion`.
