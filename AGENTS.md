# AGENTS.md

## Project

Next.js 16.4.3 app (assignment-8 / "Studio Space"), single package, React 19.3, TypeScript strict. App code lives in `src/app` and `src/components`; no tests, no CI.

## Commands

- `npm run dev` — dev server (Turbopack) on :3000
- `npm run build` — production build; treat as the verification step
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`)
- No `typecheck` script — run `npx tsc --noEmit` explicitly (works only after `next dev`/`next build` once, because `.next` type files are in `tsconfig` include)

## Next.js 16 toolchain quirks

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (Babel React Compiler plugin). With `cacheComponents`, anything dynamic/uncached must be inside a `<Suspense>` boundary or the build fails — read the versions of docs in `node_modules/next/dist/docs/` before judging Next code against older Next.js conventions.
- Tailwind v4 with **no PostCSS/tailwind.config**: CSS is processed via a custom `turbopack.rules` entry in `next.config.ts`; all theme tokens/config are CSS-first in `src/app/globals.css` under `@theme inline`. Don't create a tailwind config file.

## shadcn/ui

- `components.json`: style `base-nova`, which uses **Base UI (`@base-ui/react`) primitives, not Radix**. Generated components live in `src/components/ui`; add more with `npx shadcn add <name>`.
- `cn` helper is re-exported from the `cn` npm package via `src/lib/utils.ts` (not `clsx` + `tailwind-merge`). Icons from `lucide-react`.
- Path alias: `@/*` → `./src/*`.

## Theming (light + dark, always both)

- Dark mode is class-based (`next-themes`, `attribute="class"`, `.dark` variant in `globals.css`). The whole dark look is just the `.dark { ... }` token block in `src/app/globals.css` — tune palette there, don't restyle components dark-side.
- Rule: every new UI must work in both themes. Use semantic tokens (`bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`…); add `dark:` variants only for brand-specific surfaces like the hero gradient. Never hardcode `bg-white`/`bg-black`.
- `daisyui` is in devDependencies but unused — do not use or reference it.

## Case-sensitivity gotcha

`src/app/layout.tsx` imports `@/components/navber`, but the file on disk is `Navber.tsx` (components are `Navber.tsx`, `Benner.tsx` — note the spellings). This resolves on Windows (the usual dev machine) but **fails on Linux/CI/Vercel builds**. When touching imports or these files, make file name and import casing match exactly (`next build` is the only local check that nearly surfaces it).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
