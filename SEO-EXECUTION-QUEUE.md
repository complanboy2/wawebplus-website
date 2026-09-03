# WA Web CRM SEO Execution Queue

Noindexed working queue for `https://www.wawebplus.com/` and the Chrome Web Store item `mmkkmeiogfmoipjidmcaddbccdgmjipa`.

Generated for: 2026-09-03

## Current Reality

- The new public listing is live as `WA Web CRM - Sales Workspace`.
- Homepage, install links, SoftwareApplication schema, sitemap, and the new `/use-cases/whatsapp-web-crm.html` page were updated on 2026-09-03.
- Search Console sitemap submission and indexing requests were completed on 2026-09-03.
- Public visibility is early: branded/domain queries can surface owned assets, but broad `WhatsApp Web CRM`, scheduler, template, and bulk-sender queries are not won yet.

## Evidence Gates

| Gate | Current | Target before claiming progress | Status |
| --- | --- | --- | --- |
| Google indexation | Requested for homepage and CRM page | Search Console says indexed with matching canonical | pending crawl |
| Public query visibility | 3/10 visible or partial tracked rows | At least 6/10 visible or partial, including 2 non-branded rows | not ready |
| Authority evidence | 1 verified listing, 5 ready/gated targets | At least 6 crawlable third-party citations | not ready |
| CWS authority | New listing is public | Website/support/privacy URLs visible and current screenshots uploaded | partial |
| Conversion tracking | Website has install CTAs | Analytics events for install/pricing/support CTAs | not ready |

## P0 Execution

| Priority | Workstream | Action | Proof required |
| --- | --- | --- | --- |
| P0 | Search Console | Reinspect `/use-cases/whatsapp-web-crm.html` and `/` after 48-72 hours. | Indexed status and Google-selected canonical. |
| P0 | Content | Strengthen `chat-message-scheduler.html`, `chat-bulk-sender.html`, `chat-message-templates.html`, and `chat-crm.html` around exact commercial intent. | Updated title/meta/H1/body plus sitemap lastmod. |
| P0 | Public visibility | Recheck the 10 queries in `seo/public-search-visibility-status.csv` weekly until GSC query data is strong enough. | Query, first visible position, result URL, and evidence note. |
| P0 | Authority | Build direct links to the CWS item and `/use-cases/whatsapp-web-crm.html`. | Public crawlable page with the right product name and URL. |
| P0 | CWS conversion | Replace reused screenshots with feature-specific CRM screenshots during the next listing update. | Public CWS screenshots show CRM, scheduler, templates, and bulk sender workflows. |

## P1 Content Expansion

| Target page | Primary intent | Update needed |
| --- | --- | --- |
| `/use-cases/chat-crm.html` | WhatsApp Web CRM for sales follow-ups | Add stronger follow-up reminder, tag, note, pipeline, and handoff language. |
| `/use-cases/chat-message-scheduler.html` | WhatsApp Web message scheduler extension | Add FAQ schema and exact scheduler phrases without keyword stuffing. |
| `/use-cases/chat-bulk-sender.html` | WhatsApp Web bulk sender extension | Clarify responsible campaign use, pacing, templates, and compliance-safe positioning. |
| `/use-cases/chat-message-templates.html` | WhatsApp Web message templates | Add template library, quick replies, support replies, sales replies, and FAQ schema. |

## Verification Commands

```sh
rg -n "free trial|7-day trial|during the trial" .
rg -n "mmkkmeiogfmoipjidmcaddbccdgmjipa|WA Web CRM" index.html use-cases/*.html sitemap.xml
curl -I https://www.wawebplus.com/sitemap.xml
curl -I https://chromewebstore.google.com/detail/wa-web-crm-sales-workspac/mmkkmeiogfmoipjidmcaddbccdgmjipa
```

## Source Files

- `SEO-GTM-PLAN.md`
- `seo/public-search-visibility-status.csv`
- `seo/authority-targets.csv`
- `sitemap.xml`
- `index.html`
- `use-cases/whatsapp-web-crm.html`
