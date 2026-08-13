# Project Guidance

## Product Direction

- This is a personal problem-solving notebook for LeetCode and Advent of Code.
- Keep plain Astro with content collections. Do not migrate to Starlight.
- Treat Nano as an implementation base only. Replace its blog-oriented shell incrementally with purpose-built problem-catalogue UI; do not remove the theme wholesale unless its remaining code has been replaced.
- Preserve static output, accessible navigation, dark mode, search, source links, Markdown notes, diagrams, and code blocks.
- Solutions are mostly Rust. Future Java support is expected.
- Advent notes may retain titles, official puzzle URLs, personal notes, and solution code. Do not publish copied puzzle descriptions, examples, or private inputs.

## Architecture

- Content schemas: `src/content/config.ts`.
- LeetCode notes: `src/content/leetcode/`.
- Advent notes: `src/content/advent/`.
- Reusable UI belongs in `src/components/`.
- Component contracts and ownership: `docs/components.md`. Read the relevant entry before changing or adding a component.
- Favour small Astro primitives over new client-side code or framework migrations.
- Use build-time Markdown transforms for Markdown output. Do not add DOM mutation for static markup.

## Documentation

- When framework documentation is needed, query the official Astro MCP first. Use other sources only when Astro MCP has no relevant answer.
- Keep durable component behaviour, props, slots, ownership, and composition rules in `docs/components.md`.
- Update `docs/components.md` in the same change when a documented component changes, a reusable component is added or removed, or a cross-component UI contract changes.
- Use source comments only for non-obvious, local implementation constraints. Do not duplicate component documentation in source comments.

## Theme Work

- Reuse and extend `AnchorHeading`, `ArrowLink`, `StatCard`, and `NotePage` before adding near-duplicate markup.
- Keep heading anchors server-rendered and preserve matching table-of-contents labels.
- Keep problem cards, collection navigation, and statistics catalogue-focused rather than blog-focused.
- Do not resume theme replacement until the relevant component contracts are recorded in `docs/components.md`.
- Upgrade Astro before substantial additional theme changes; project currently uses Astro 4.

## Verification

- Run `npm run build`, `lint`, and `git diff --check` after code changes.
- Check generated HTML when changing Markdown, headings, table of contents, or static-route behavior.
- Do not revert unrelated worktree changes.

## Maintenance Rule

- Update this file in the same change whenever durable project direction, architecture, workflows, dependencies, documentation rules, or verification steps change.
- Do not update it for transient implementation details or routine progress.
