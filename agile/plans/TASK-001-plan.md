# TASK-001 Implementation Plan

## Approach
1. Cut task branch `task/TASK-001-seo-enhancements` from `main`.
2. Update `sitemap.xml` with `<lastmod>` date and `<image:image>` schema.
3. Update `index.html` href on line 284 to append `/`.
4. Validate XML format with `xmllint`.
5. Author agile triplet and docs pointer.

## Files Touched
- `sitemap.xml`
- `index.html`
- `docs/AMENDMENTS.md`
- `agile/items/TASK-001-seo-enhancements.md`
- `agile/plans/TASK-001-plan.md`
- `agile/testing/TASK-001-automated.md`
- `agile/testing/TASK-001-sweep.md`

## Risks & Rollback
- Risk: Malformed XML breaking crawler parsing. Mitigation: Checked with `xmllint --noout`.
- Rollback: Revert commit on task branch.
