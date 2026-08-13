# Component Registry

This file is the source of truth for reusable UI contracts. It is written for
AI agents that maintain this repository.

## Rules

- Reuse an existing component before adding similar markup.
- Extend a component when its new behavior fits every existing consumer.
- Add a new component only for a stable, repeated UI pattern.
- Update this registry with any reusable component, prop, slot, ownership, or
  behavior change.
- Keep implementation-specific details in source comments only when they are
  non-obvious and local.

## Shell

| Component | Contract |
| --- | --- |
| `layouts/PageLayout.astro` | Root document shell. Requires `title` and `description`. Owns `Head`, global header, `main`, and footer. All routable pages use it directly or through `NotePage`. |
| `components/Head.astro` | Global metadata, fonts, `ClientRouter`, and the small client runtime. The runtime owns theme selection, entry animation, back-to-top behavior, and the home collection tabs. Do not add static-Markdown DOM transforms here. |
| `components/Container.astro` | Standard centered content width and horizontal padding. Use for all page-level content. |
| `components/Header.astro` | Site-wide primary navigation. Route labels and destinations come from `PAGE_METADATA`. |
| `components/Footer.astro` | Site-wide footer, theme controls, and `BackToTop`. Button IDs are consumed by `Head.astro`. |

## Generic Primitives

| Component | Contract |
| --- | --- |
| `components/AnchorHeading.astro` | Server-rendered anchored heading. Requires `level` (`1` through `6`) and unique `id`; accepts `class`. Use for headings authored in Astro. Markdown headings receive anchors from the build-time rehype pipeline. |
| `components/ArrowLink.astro` | Catalogue row link. Requires `href`; accepts `class` and standard anchor attributes. Default slot is the bold primary label. Named `end` slot appears before the arrow for a secondary value or status. |
| `components/StatCard.astro` | Numeric summary card. Requires numeric `value` and text `label`. Optional `href` changes it from static `div` to linked `a`. Use for counts, not general content cards. |
| `components/Link.astro` | Inline or navigation link. Requires `href`; `external` opens a new tab and `underline` defaults to true. Do not use for catalogue rows; use `ArrowLink`. |
| `components/BackToPrev.astro` | Styled return link. Requires semantic fallback `href`; the client runtime also calls browser history when available. |
| `components/BackToTop.astro` | Footer-only button. Its `back-to-top` ID is required by `Head.astro`. |
| `components/NotePage.astro` | Shared detail-note shell. Requires document metadata plus `backHref` and `backLabel`. Named slots: `header`, `toc`, and `after`; default slot is rendered Markdown. Use for LeetCode and Advent detail pages. |

## Collection Components

| Component | Contract |
| --- | --- |
| `components/leetcode/ProblemArrowCard.astro` | LeetCode listing row. Takes a mapped `ProblemCardEntry`; composes `ArrowLink` and renders the title plus difficulty badge. |
| `components/advent/ChallengeArrowCard.astro` | Advent listing row. Takes a mapped `AdventCardEntry`; composes `ArrowLink` and renders day and title. |
| `components/leetcode/ProblemHeader.astro` | LeetCode note header. Receives LeetCode frontmatter and exposes problem number, title, category, subcategories, difficulty, and official URL. Heading ID is `problem-{num}`. |
| `components/advent/ChallengeHeader.astro` | Advent note header. Receives Advent frontmatter and exposes year, day, title, and official puzzle URL. Heading ID is `challenge-{year}-{day}`. |
| `components/leetcode/TableOfContents.astro` | Nested Markdown-heading navigation for both collections. Top-level use passes `headings` and renders its own `table-of-contents` heading. Recursive internal use passes `nodes`. Strip the build-time anchor marker from display labels while retaining the original heading slugs. |

## Markdown And Anchors

- `astro.config.mjs` applies `rehype-slug` and `rehype-autolink-headings` through the Unified Markdown processor at build time.
- Markdown heading links must use IDs from Astro's rendered heading metadata.
- Astro-authored headings use `AnchorHeading` with deliberate stable IDs.
- After changing Markdown, headings, anchors, or table-of-contents behavior, inspect generated `dist` HTML in addition to the normal build and lint checks.

## Theme Replacement Boundary

- Nano remains an implementation base until each retained responsibility has a
  purpose-built replacement.
- Tailwind 4 is configured through `@tailwindcss/vite`; keep theme tokens and
  custom CSS in `src/styles/global.css`, not a legacy Tailwind config file.
- Preserve static output, dark mode, Pagefind search, responsive navigation,
  source links, diagrams, and code blocks throughout replacement.
- Remove old theme code only when it has no consumers and an equivalent
  documented replacement exists.
