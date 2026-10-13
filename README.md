# MD. Sazzad Hossain Adib — Developer Portfolio

Developer portfolio of MD. Sazzad Hossain Adib, AI Engineer & Full-Stack Developer in Dhaka, Bangladesh. Built with the Next.js App Router, React Server Components, Tailwind CSS v4 and Framer Motion, with an editorial design language: big Syne display type, scroll-driven motion, and data-driven pages.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerendered)
npm run start      # serve the production build
npm run lint       # ESLint (flat config, next/core-web-vitals + TypeScript)
```

Extra scripts:

| Script              | What it does           |
| ------------------- | ---------------------- |
| `npm run typecheck` | `tsc --noEmit`         |
| `npm run format`    | Prettier over the repo |

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) before building for production so canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt` point at the deployed domain. It defaults to `http://localhost:3000`.

## Routes

| Route                                                          | Notes                                                                                                                          |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                                            | Intro loader, scroll-driven hero, horizontal project rail, engineering, journey, scoper teaser, contact, footer, bug-hunt game |
| `/projects`                                                    | "Proof of Work" archive with stacked sticky cards — live demo, case study and code links                                       |
| `/services`                                                    | Service accordion, four-step process, stack grid, FAQ, CTA, local project scoper                                               |
| `/about`                                                       | Sticky sidebar with scroll-spy, story, principles, receipts, education & focus                                                 |
| `/contact`                                                     | Live status bar, three channels (email, LinkedIn, GitHub) with QR codes, "what happens next"                                   |
| `/case-study`                                                  | The lead case study (AI Doctor Assistant)                                                                                      |
| `/case-study/[slug]`                                           | One case study per project, generated from `data/projects.ts`                                                                  |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/llms.txt` | SEO and agent-readable files                                                                                                   |

## Structure

```
app/                    routes, metadata, sitemap/robots/OG image, globals.css (design tokens)
components/
  layout/               Header, Footer, MenuOverlay (full-screen menu), IntroLoader, PageTransition, providers
  motion/               Reveal, FadeIn, Stagger, TextReveal, ImageReveal, MaskReveal, Marquee, Magnetic, Glitch
  ui/                   Button/LinkButton, SectionLabel, PageTitle, SplitHeading, StrokeText, BrowserFrame, Accordion…
  home/ projects/ services/ about/ contact/ case-studies/
data/                   typed content: site, projects, services, home, about, contact, caseStudies
lib/                    motion constants, utils, scoper logic, media-query hook
```

All content lives in `data/` — pages map over typed data instead of repeating markup. Each project in `data/projects.ts` carries its own description, features, challenges and solutions; `data/caseStudies.ts` builds a case study from that data (each challenge becomes a numbered section with its solution and a screenshot). An optional bilingual (Bangla / English) case-study layout is also available.

### Updating content

- **Profile, links, availability** — `data/site.ts`
- **Projects** — `data/projects.ts` (set `featured: true` to put a project on the homepage rail)
- **Case-study stats and screenshots** — `data/caseStudies.ts`
- **Home, About, Services, Contact copy** — `data/home.ts`, `data/about.ts`, `data/services.ts`, `data/contact.ts`

## Design system

Tokens are defined once in `app/globals.css`:

- **Color** — RGB-channel variables (`--c-surface`, `--c-surface-2/3`, `--c-ink`, `--c-accent`, `--c-accent-fill`…) exposed to Tailwind as `surface`, `ink`, `accent`, etc. Light and dark themes follow `prefers-color-scheme`.
- **Type** — Syne (display), Manrope (body) and Noto Sans Bengali via `next/font` (self-hosted, no external requests); a system monospace stack for labels. Fluid display sizes (`text-page-thin`, `text-page-bold`, `text-section`…), a letter-spacing scale (`tracking-tag` → `tracking-spread`) and small sizes (`text-micro`, `text-mini`).
- **Utilities** — `gutter`, `eyebrow`, `text-stroke` (outlined display type), `title-fit` (shrinks long page-title words to fit the viewport), `bg-grid`, `max-w-site`, `max-w-page`.

## Motion system

`lib/motion.ts` holds the shared easing curves, durations, stagger steps and viewport options; every animated component reads from it.

- **Reveals** — `Reveal`, `FadeIn`, `Stagger`, `MaskReveal`, `ImageReveal` trigger once via Framer Motion viewport detection.
- **Text** — `TextReveal` masks lines, words or characters (used for the hero letter build and every page title).
- **Scroll** — the homepage hero (sticky stage where the inline portrait grows into the intro card), the horizontal project rail, and the `/projects` card stack are driven by `useScroll`.
- **Page transitions** — React `<ViewTransition>` (View Transitions API) cross-fades and lifts pages; unsupported browsers simply swap.
- **Marquees** — pure CSS, two identical copies translated by −50% for a seamless loop; pause on hover.
- **Reduced motion** — `MotionConfig reducedMotion="user"`, `useReducedMotion` in every primitive, a CSS rule that forces all `[data-reveal]` elements visible, and global animation/transition suppression. Decorative loops stop; the intro loader is skipped.
- Framer Motion's drag/layout features are lazy-loaded (`LazyMotion`), keeping them out of the critical bundle. GSAP isn't needed.

## Interactive pieces

- **Project scoper** — four guided questions produce a draft blueprint you can download as Markdown or email. Runs entirely in the browser.
- **Message form** — validates, then opens the visitor's email client with the message pre-written (there is no backend).
- **QR codes** — generated server-side as SVG from the LinkedIn and GitHub profile links.
- **Bug hunt** — a canvas shooter after the footer: arrow keys move, hold space to fire (keeps firing while moving), esc pauses; on touch, hold and drag. Three uptime lives, combos and waves; best score in `localStorage`.
- Footer wordmark: the full stop of "sazzad." can be grabbed and flung.

## Assets

`public/images` holds WebP versions of the real portrait and project screenshots:

- `portrait.webp` (square)
- `projects/<slug>.webp` — the project's cover screenshot
- `case-studies/<slug>/<name>.webp` — screenshots referenced in `data/caseStudies.ts`

To add or replace a screenshot, export it as WebP (around 1600px wide) at the same path. The decorative star and bolt are inline SVG; the custom cursor is an inline SVG data URI.
