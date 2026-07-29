# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static site (no build step, no framework) that logs what the owner learned during a 3-day "Claude Code" AI course. Content is Korean-language, organized by topic (dev environment setup, AI game-making, webpage deploy, MCP/Supabase, Vercel deploy, tools reference, aggregated result links, and a growing Q&A accordion).

## Commands

There is no `package.json`, build step, linter, or test suite. This is plain HTML/CSS/JS.

- **Preview locally**: open `index.html` directly in a browser (e.g. `start index.html` on Windows).
- **Deploy**: `vercel --prod` from the project root. The GitHub repo (`hj314chang-cell/my-web2`) is also connected to the Vercel project, so a `git push` to `master` triggers an automatic production deploy — manual `vercel --prod` is only needed for uncommitted/local-only changes.

## Architecture

Three files, no dependencies:
- `index.html` — all content. Structure: `<header class="hero">` (title/intro) → `<div class="layout">` containing a sticky left `<nav class="sidebar">` (icon + label links) and `<main>` with one `<section class="topic" id="...">` per sidebar entry → `<footer>`.
- `css/style.css` — all styling via CSS custom properties defined in `:root` (colors, spacing) with a `@media (prefers-color-scheme: dark)` override block for dark mode. Loads the "Wanted Sans Variable" webfont via `@import`.
- `js/script.js` — a single `IntersectionObserver` that toggles `.is-active` on the sidebar link matching the topic section currently in view. That's the only JS behavior on the page.

### Content conventions used across sections

- `<span class="badge badge-dayN">` — day-of-course tag on each section heading (`badge-day1`/`2`/`3`, or `badge-tools` for reference sections).
- `<p class="takeaway">` — callout box for a key insight; stack multiple by placing consecutive `<p class="takeaway">` elements (CSS adds spacing between adjacent ones). If a takeaway needs a nested list, use `<div class="takeaway">` instead of `<p>` (a `<p>` cannot legally contain a `<ul>`).
- `<div class="result">` with one or more `<a class="result-link">` — links to a section's live output. An unfilled/placeholder link uses `is-pending` + `aria-disabled="true"` and no `href` target; remove `is-pending` once a real URL exists.
- `#results` section (`.result-grid` / `.result-card`) — a single place aggregating every result link across all sections; keep it in sync when adding/renaming a result link elsewhere.
- `#questions` section (`.qa-list` / `.qa-item`) — native `<details>/<summary>` accordion for open questions. Claude-authored answers are tagged with `<span class="qa-tag">클로드가 작성했어요</span>` inside `.qa-answer` to distinguish them from the owner's own notes.
- Sidebar nav links (`.sidebar a`) each carry an inline SVG icon before the label; when adding a new topic section, add a matching sidebar link (with icon) and give the section a matching `id`.

## Related project

A companion project, `my-budget` (sibling directory, separate git repo), is a Next.js + Supabase budget-tracking app built during the same course and deployed to Vercel; its live URL is referenced from this site's `#mcp` and `#results` sections.
