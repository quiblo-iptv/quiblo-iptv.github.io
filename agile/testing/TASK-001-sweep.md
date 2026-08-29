# TASK-001 Manual Sweep Test Tickets

| Ticket ID | Preconditions | Steps | Expected Result | Priority | Pass/Fail |
| --- | --- | --- | --- | --- | --- |
| TSK-001-01 | Browser open | 1. Open `sitemap.xml` in browser or curl.<br>2. Inspect `<lastmod>` and `<image:image>` nodes. | Valid XML displayed with lastmod date and og-image URL. | High | PASS |
| TSK-001-02 | Browser open | 1. Open `index.html`.<br>2. Navigate to "How to set it up" button.<br>3. Inspect link URL target. | Link targets `https://quiblo-iptv.github.io/quiblo-wiki/wiki/getting-started/` with trailing slash. | Normal | PASS |
