# TASK-001: Technical SEO Enhancements for Landing Page

## Problem & Motivation
Technical SEO audit identified three improvement areas for the landing page:
1. Absence of `<lastmod>` tag in `sitemap.xml` causing search engines to rely on less deterministic crawl triggers.
2. Missing Google Image Sitemap extensions for `assets/og-image.png`.
3. An internal link in `index.html` pointing to `https://quiblo-iptv.github.io/quiblo-wiki/wiki/getting-started` without a trailing slash, triggering an unnecessary HTTP 301 redirect hop.

## Scope
- Add `<lastmod>2026-08-29</lastmod>` to `sitemap.xml`.
- Add Google Image XML schema extension (`xmlns:image`) and image record in `sitemap.xml`.
- Fix trailing slash on the wiki getting-started link in `index.html`.
- Add `docs/` and `agile/` documentation trees.

## Explicit Non-Scope
- Altering visual design or UI styling.
- Modifying brand or metadata outside sitemap/canonical links.

## Acceptance Criteria
- `sitemap.xml` parses cleanly as XML and includes `<lastmod>` and `<image:image>`.
- `index.html` contains canonical trailing slash on the wiki link.
- `docs/AMENDMENTS.md` points to canonical constitution.
