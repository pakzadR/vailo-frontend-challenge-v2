# Submission

> Fill in each section below. Keep it honest and concise — bullet points are fine.

## How to run the app

Requires Node ≥ 20 and pnpm 10 (`corepack enable`).

```bash
pnpm install
pnpm dev
```

- Studio → http://localhost:5173 · Website → http://localhost:3000
- No API keys, no `.env` (optional: `NEXT_PUBLIC_STUDIO_URL`, defaults to the studio URL above)
- One app only: `pnpm --filter @pixa/studio dev` (or `@pixa/website`)
- Checks: `pnpm build` · `pnpm typecheck` · `pnpm lint` · `pnpm format:check`

## Architecture

pnpm workspace + Turborepo: `apps/studio` (Vite + React 19) and `apps/website` (Next.js App Router).

```
apps/
├── studio/src/
│   ├── features/
│   │   ├── generation/
│   │   │   ├── api/       # URL building + transport — the only place URLs are built
│   │   │   ├── hooks/     # TanStack Query hooks + per-feature query-key factory
│   │   │   ├── store/     # zustand, only where state earns it
│   │   │   ├── views/     # components — talk only to hooks
│   │   │   └── types/
│   │   └── templates/     # same anatomy (api / hooks / views / types)
│   ├── components/ui/     # shared shell: app-shell, icons, tooltip
│   ├── lib/               # axios client, query-client, theme-store
│   └── routes/            # file-based: __root, /workspace, /templates
└── website/
    ├── app/               # App Router: layout, page, globals.css (tokens)
    ├── components/
    │   ├── nav/ hero/ templates/ highlights/ live-demo/ pricing/ footer/
    │   └── ui/            # icons, pollinations-image, theme-toggle
    └── lib/               # config (studio links), pollinations (RSC fetch)
```

File names carry their folder suffix (e.g. `pollinations-api.ts`, `workspace-views.tsx`).

Key decisions:

- **Query-per-image, not `useMutation`**: each of the 1–4 images is its own query keyed by the exact request (prompt/model/dims/seed) → independent pending/error/retry per image, identical re-runs resolve from cache, and reopening a history entry just seeds the cache — nothing re-generates.
- **Images via `new Image()`** wrapped as a `queryFn` (Pollinations 403s any Origin-carrying request); two independent 2-slot abort-aware loader pools so a running batch never starves template previews. All other HTTP goes through one shared axios client (`lib/axios.ts`).
- **Zustand where it earns it**: persisted history (`localStorage`), theme, and a session generation store + a root-mounted watcher so a running batch survives navigation.
- **Website** is RSC-first: the live-demo strip fetches Pollinations server-side (no Origin header → data URIs); client components only where there's interaction. Both apps share the same Tailwind v4 tokens, and "Use template" deep-links into the studio's typed search params.

## How I planned the work

1. **Scaffold + tokens first** — monorepo, tooling, and the shared Tailwind theme, so both apps grew on the same foundation.
2. **Website (marketing) next** — a contained scope with fixed content; it locked the visual language and brand before the app work started.
3. **Studio, design-first then feature by feature** — static UI for the three-pane workspace and gallery, then real functionality landed piece by piece: generation flow → history (persist + reuse) → templates data layer.
4. **Connect the two apps last** — template deep links from the website into the studio's typed search params, so a prompt picked anywhere lands pre-filled in the workspace and reproduces its preview exactly.
5. **Polish pass throughout** — loading/error/empty states, responsiveness, downloads, and background generation were finished against the checklist rather than left to the end.

## Struggles

- **The Pollinations Origin/403 gotcha reached further than expected.** It doesn't just rule out `fetch` for loading — it shaped the whole image pipeline: loads had to be `new Image()` wrapped as a `queryFn`, real downloads needed a blob read with a new-tab fallback (canvas capture is impossible without CORS), and TanStack's default `networkMode: 'online'` paused queries when testing offline, leaving an infinite "Generating…" until I switched the image queries to `networkMode: 'always'` so failures surface as real, retryable errors.
- **Keeping a generation alive across navigation.** TanStack v5 cancels an in-flight query when its last observer unmounts if the `queryFn` consumed the `AbortSignal` — so leaving `/workspace` silently killed the batch. The fix was moving the active batch into a session store and mounting a headless watcher at the root so the queries always keep one observer; along the way I also had to disable `retryOnMount`/`refetchOnReconnect`, because a persisted batch otherwise auto-refires every failed image on each return to the page.

## What I skipped and why

Nothing — every checklist item shipped, plus a few extras (background generation, real downloads, website → studio deep links). The only things not built are those the brief marks as not required: auth, backend, i18n, a broader test suite.

## With one more week…

1. **Voice-to-text for prompts** — dictating a prompt instead of typing it (Web Speech API with a mic button on the textarea); a real accessibility and speed win for the core loop.
2. **Video generation** — a second workspace mode targeting a text-to-video model, reusing the same option-binding, per-item states, and history architecture.

## Notes

- Claude (AI) was used for assistance.
- A few points of the brief were clarified with Karwan (@karwan01) during the challenge — thanks for the quick answers.
- Main references: the TanStack Query/Router docs and the Tailwind v4 / Radix UI docs.
- No known bugs at submission time; both apps pass `build`, `typecheck`, `lint`, and `format:check`.
