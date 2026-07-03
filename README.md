# Pixa Studio — Frontend Hiring Challenge

Hi! 👋 Thanks for taking the time to do this challenge. You'll build a tiny AI image-generation product, end to end, with the exact stack and patterns we use every day — so by the end of it you'll know what working with us feels like, and we'll know how you think.

**What you'll build:** a monorepo with two things in it —

1. **Pixa Studio** (the app) — generate images from a prompt, with options that control the output
2. **A marketing website** for it — one good landing page

**Time box: 24 hours** from receiving this brief. We don't expect perfection — we expect good judgment about what to polish and what to skip. Ship what you have; an honest "here's what I cut and why" scores better than a rushed everything.

**Design reference:** the `Pixa Studio.pdf` file included in this repo — use it as your visual north star. Pixel-perfection is not required; matching its spirit is appreciated.

**Stuck or unsure?** Ask us. Questions during the challenge are welcome — asking good questions is a signal, not a penalty.

---

## Contents

1. [Monorepo & stack](#1-monorepo--stack)
2. [The APIs (free, no keys)](#2-the-apis-free-no-keys)
3. [The app — `apps/studio`](#3-the-app--appsstudio)
4. [The website — `apps/website`](#4-the-website--appswebsite)
5. [How to submit](#5-how-to-submit)
6. [How we evaluate](#6-how-we-evaluate)
7. [Bonus ideas](#7-bonus-ideas)
8. [Suggested time budget](#8-suggested-time-budget)

---

## 1. Monorepo & stack

pnpm workspace (Turborepo optional):

```
pixa/
├── apps/
│   ├── studio/     # the app — Vite + React 19
│   └── website/    # marketing site — Next.js (latest, App Router)
├── packages/       # optional: shared ui/config if you find it earns its keep
├── pnpm-workspace.yaml
└── README.md
```

|              | App (`apps/studio`)                          | Website (`apps/website`)                  |
| ------------ | -------------------------------------------- | ----------------------------------------- |
| Framework    | React 19 + Vite                              | Next.js latest (App Router)               |
| Language     | TypeScript (strict)                          | TypeScript (strict)                       |
| Routing      | TanStack Router (file-based)                 | App Router — Server Components by default |
| Data         | TanStack Query + **axios** for data requests | Server-side fetching in RSC               |
| Client state | **Zustand** (where a feature needs a store)  | —                                         |
| Styling      | Tailwind CSS v4 + Radix UI primitives        | Tailwind CSS v4                           |

## 2. The APIs (free, no keys)

### Image generation — Pollinations.ai

No signup, no key. The response is the image itself:

```
GET https://image.pollinations.ai/prompt/{urlEncodedPrompt}
    ?model=flux          // flux | turbo
    &width=1024
    &height=1024
    &seed=42             // same prompt + same seed = same image
    &nologo=true
```

The query params are your "model options" — every control you build binds to one of them. This mirrors the fal.ai option-binding pattern we use in production.

**Two gotchas — we're telling you up front so you don't lose hours to them:**

> **Gotcha #1 — no `fetch()`, no axios, for images.** Pollinations rejects any request carrying an `Origin` header with a 403, and browsers attach `Origin` to every cross-origin `fetch()` and XHR. Plain image loads (`<img src>` / `new Image()`) don't send it and work fine. So detect loading/error states by wrapping `new Image()` with `onload`/`onerror` — that composes cleanly with TanStack Query as a `queryFn` that resolves once the image is in the browser cache.
>
> **Gotcha #2 — it's slow and it rate-limits.** Generation takes 5–45 seconds, occasionally fails, and the anonymous tier 429s concurrent bursts — fire many images at once and most will fail. Queue or bound your concurrency. Your UI must always know whether each image is _pending, done, or failed_ — see [Loading & error states](#loading--error-states-graded-carefully).

### Templates — a curated `templates.json`

Ship a static asset (we provide a starter set) — each template is a prepared prompt plus options:

```json
{
  "id": "watercolor-fox",
  "prompt": "a watercolor painting of a red fox…",
  "model": "flux",
  "aspect": "1:1",
  "seed": 1207
}
```

Load it with TanStack Query like any remote resource, using **axios as the transport inside the `queryFn`** — in production our data requests go through a shared axios client, and we want to see you wire one up the same way. Loading/error/empty states apply here too.

Each template's **preview image is simply the Pollinations URL built from its prompt + options + fixed seed**. Deterministic — so the preview is _exactly_ the image "Use template" reproduces in the workspace. No second provider needed.

> _Why not a public API?_ Civitai's images API used to expose prompts anonymously but no longer does (verified July 2026), and Lexica's free API is unreliable. If you find a working free source of prompt templates, using it instead is a bonus, not a requirement.

## 3. The app — `apps/studio`

A persistent **sidebar navigation** with two entries (Radix Tooltip on each when collapsed):

| Route        | Purpose                                               |
| ------------ | ----------------------------------------------------- |
| `/workspace` | Generation workspace (`/` redirects here)             |
| `/templates` | Template gallery — curated prompts with live previews |

### Workspace

- [ ] **Prompt input** — textarea; `Enter` submits, `Shift+Enter` inserts a newline.
- [ ] **Options sidebar** bound to the request:
  - Model select (`flux` / `turbo`) — Radix Select
  - Aspect ratio (1:1, 16:9, 9:16 → mapped to width/height) — segmented control or Radix ToggleGroup
  - Seed — number input with a "randomize" button; explain seed in a Radix Tooltip
  - Image count (1–4) — Radix Slider
- [ ] **Options demonstrably drive the output** — every control maps to a request param and its effect is verifiable: switching aspect ratio changes the delivered image dimensions, switching model changes the result, re-running with the same prompt + seed reproduces the identical image. (This is exactly how we'll test it.)
- [ ] **Generate flow driven by TanStack Query** — `useMutation` or query-per-image, your call; justify it in the README. Skeletons sized to the chosen aspect ratio, error state with retry.
- [ ] **History panel** — results are saved to a history panel in the workspace (persist to `localStorage`). Clicking an item opens a Radix Dialog with the full prompt + options used and a "reuse these settings" action that re-fills the form. The detail view must show the exact options each image was generated with.
- [ ] **Tooltips on every non-obvious control** (Radix Tooltip). A UX bar, not decoration.
- [ ] **Theme** — light/dark toggle, persisted, no flash of the wrong theme on load. Tailwind v4 theme tokens, not scattered hex values.
- [ ] **Empty states** — first visit to workspace, templates, and history should not look broken.

### Templates

- [ ] Grid of template cards (preview image + truncated prompt) loaded with TanStack Query — loading skeletons, error + retry, empty state.
- [ ] **"Use template"** navigates to `/workspace` with the template's prompt **and options (model, aspect, seed)** applied via **typed search params** — the workspace form arrives pre-filled, and regenerating reproduces the preview exactly. _This handoff is the thing we look at hardest on this page._
- [ ] Simple client-side search/filter over the loaded templates.

### Loading & error states (graded carefully)

We test these deliberately — with DevTools network throttling and by forcing failures:

- [ ] **Per-image state** — each of the 1–4 requested images independently shows _pending → loaded_ or _pending → failed_; one failed image never blocks or misrepresents the others.
- [ ] **Skeletons, not spinners-in-a-void** — placeholders match the chosen aspect ratio so nothing jumps when images arrive.
- [ ] **Every failure is recoverable in place** — failed image: retry that image; templates failed: retry button. Never a dead end or a blank screen.
- [ ] **Slow ≠ broken** — during a 30-second generation the UI stays responsive, the button shows it's working, and the user can keep typing the next prompt.
- [ ] **No error swallowing** — a failed request must never render as an infinite skeleton or a broken image icon.

### Responsiveness

- [ ] **No horizontal scroll, no overlapping panels, at any width.** The three-pane workspace (options / canvas / history) adapts — stack, collapse, or move panels behind a toggle, your choice, as long as every feature stays reachable.
- [ ] **Templates grid scales its column count** with the viewport (e.g. 4 → 2 → 1).
- [ ] **Images never overflow their container** — the aspect-ratio placeholder logic must hold at every width.
- [ ] Touch targets stay comfortably tappable on mobile; tooltips must not be the only way to reach information a touch user needs.

### Architecture

Every feature follows the same internal anatomy :

```
src/features/generation/
├── api/        # axios calls + Pollinations URL building — the only place URLs are built
├── hooks/      # TanStack Query hooks (useQuery/useMutation wrappers) + this feature's query keys
├── store/      # client state, when the feature needs it — Zustand
├── views/      # the feature's components
└── types/      # the feature's TypeScript types
```

- [ ] **Feature-oriented folders** (`src/features/generation`, `src/features/templates`, …) each with the `api / hooks / store / views / types` layout above — not one giant `components/` dump.
- [ ] **Isolated API layer** — the feature's `api/` owns URL building and HTTP calls; components never string-concatenate URLs and never import axios directly.
- [ ] **Query keys live with their feature** — a small key factory defined once in the feature's `hooks/`, imported by every call site of that feature's queries. No inline `['some', 'key']` arrays in components.
- [ ] **Components only talk to `hooks/`** — views render what the feature's hooks give them; the TanStack wiring stays out of JSX files.
- [ ] **Client state in Zustand** where a feature needs a store (e.g. generation history). Router and Query set up once, typed.
- [ ] **One shared axios instance** (base config, error normalization) that feature `api/` modules import. Image generation is the documented exception: it goes through `new Image()` (see Gotcha #1).

## 4. The website — `apps/website`

One good landing page. Server Components by default; client components only where interaction demands it.

- [ ] Hero with headline + CTA linking to the studio app
- [ ] Features section (3–4 cards)
- [ ] **Live demo strip** — a few images fetched from Pollinations _server-side_ (fixed prompts + seeds so they're stable), showing you understand RSC data fetching
- [ ] Pricing section (fake tiers)
- [ ] Proper `metadata` (title, description, OpenGraph); responsive; shares the same theme/brand as the app

## 5. How to submit

1. **Git repo** — do all your work in the GitHub repository we shared with you. **Write meaningful commits** — we read them: small, purposeful commits tell us more than one big "final version".
2. **Branch workflow** — create two branches: `main` and `staging`.
   - Build each feature on its own branch and open a **PR into `staging`**. Once the PR is merged, **delete the feature branch**.
   - When you're ready to submit, open a **final PR from `staging` to `main`** and mention @karwan01.
3. **`SUBMIT.md`** — a short write-up covering:
   - **How to run the app** — the exact commands to install and start it.
   - **Your architecture** — how the project is structured, and the decisions and trade-offs behind it.
   - **What you skipped and why** — we genuinely respect honest scoping.
   - **What you'd do with one more week.**

**Before you submit — a friendly final pass.** These are the first things we look at:

- [ ] No secrets or tokens committed (this challenge needs none anyway)
- [ ] `any` reserved for genuine edge cases, not sprinkled to silence the compiler
- [ ] Data fetching flows through TanStack Query, not bare `useEffect`
- [ ] The work is your own — using references and AI assistance is normal, just note it in the README

## 6. How we evaluate

**Save your time — these are NOT required:** auth, backend, database, tests beyond one or two you consider load-bearing, i18n, animations beyond taste.

| Area                            | Pts | What we look for                                                                                                         |
| ------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------ |
| Architecture & folder structure | 15  | Feature folders with the `api / hooks / store / views / types` anatomy, per-feature query keys, sensible monorepo wiring |
| Option binding correctness      | 10  | Every option provably changes the output; same seed + prompt reproduces the image                                        |
| TanStack Query usage            | 15  | Correct loading/error/cache handling, no useEffect-fetching                                                              |
| TanStack Router usage           | 10  | Typed file-based routes, typed search params for the template → workspace handoff                                        |
| UX & polish                     | 15  | Tooltips, keyboard behavior, no layout jank, "Loading & error states" and "Responsiveness" sections                      |
| Theming                         | 10  | Consistent tokens, dark/light without flash, app + website match                                                         |
| Next.js site                    | 10  | RSC data fetching, metadata, responsive                                                                                  |
| Code quality                    | 10  | Strict TS, readable, no dead code, no over-engineering                                                                   |
| README & commits                | 5   | Decisions explained, honest scoping                                                                                      |

## 7. Bonus ideas

Extra credit and tie-breakers between close submissions — skipping them costs nothing:

- **CI on the repo** — a GitHub Actions workflow running **build, tests, Prettier check, and ESLint** on every PR, with `staging` and `main` protected so a red check blocks the merge. Your feature PRs into `staging` (see [How to submit](#5-how-to-submit)) will exercise the pipeline naturally.
- **Deployed preview** — app and/or website on a free tier (Vercel/Netlify), link in the README.
- **Shared `packages/ui`** — a small package consumed by both apps (only if it earns its keep).

## 8. Suggested time budget

Guidance, not rules:

| Hours | Focus                                                                       |
| ----- | --------------------------------------------------------------------------- |
| 2h    | Monorepo scaffold, tooling, theme tokens                                    |
| 8h    | Studio workspace — option binding, generate flow, states                    |
| 3h    | Templates page + workspace handoff, history panel + dialog                  |
| 4h    | Marketing site                                                              |
| 3h    | Polish pass — tooltips, empty states, keyboard, dark mode, responsive check |
| 1h    | README, deploy                                                              |

---

That's everything. Build something you'd be proud to demo — and have fun with it. Good luck! 🚀
