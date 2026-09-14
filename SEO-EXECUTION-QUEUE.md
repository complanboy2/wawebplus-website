# WA Web Utils SEO Execution Queue

Noindexed working queue for `https://www.wawebplus.com/` and the Chrome Web Store item `oajgkebdeioegjkaohcipgblnkjibple`.

Generated for: 2026-09-03
Updated for WA Web Utils review and SEO status: 2026-09-14

## Portfolio Goal Inclusion

WA Web Utils is now part of the same active SEO goal as `WA - Download Group Phone Numbers`, but it must be measured independently. Do not count contacts-extension indexing, backlinks, or Search Console movement as WA Web Utils progress. WA Web Utils progress requires evidence for `www.wawebplus.com`, the CWS item `oajgkebdeioegjkaohcipgblnkjibple`, and its own WA Web CRM, scheduler, bulk-sender, template, and follow-up reminder queries.

## Current Reality

- The updated listing is submitted for Chrome Web Store review as `WA Web Utils - Sales Workspace`.
- Chrome Web Store dashboard still shows the `WA Web Utils - Sales Workspace` draft as pending review on 2026-09-13.
- The public Chrome Web Store result can still show the older published title/snippet until Google approves the pending draft.
- Public search also shows a separate established Chrome extension using the `WA Web Utils` name, so brand-confusion and SEO collision risk are active.
- Homepage, install links, SoftwareApplication schema, sitemap, and the new `/use-cases/whatsapp-web-crm.html` page were updated on 2026-09-03.
- Homepage and guides visible shorthand were cleaned from `WA+` to `Utils` on 2026-09-13, and all sitemap dates were refreshed after the WA Web keyword retargeting.
- Buyer-facing pre-review wording was removed on 2026-09-14, and commercial HowTo schema was added to the WA Web CRM, Chat CRM, scheduler, bulk-sender, and template pages.
- The local SEO check now parses JSON-LD and fails if any P0 commercial page loses FAQ or HowTo schema.
- Search Console sitemap submission and indexing requests were completed on 2026-09-03.
- IndexNow accepted all 12 sitemap URLs with HTTP 200 on 2026-09-03 after the feature-page SEO update.
- IndexNow accepted all 12 sitemap URLs with HTTP 200 on 2026-09-13 after the WA Web Utils review-status and analytics update.
- IndexNow accepted all 12 sitemap URLs with HTTP 200 on 2026-09-13 after the WA Web keyword retargeting, and the repeatable command is now tracked as `npm run seo:indexnow:record`.
- IndexNow accepted all 12 sitemap URLs with HTTP 200 on 2026-09-14 after commercial HowTo schema and sitemap freshness updates went live.
- Public visibility is early: branded/domain queries can surface owned assets, but broad `WA Web CRM`, scheduler, template, and bulk-sender queries are not won yet.
- P0 feature-page SEO copy and FAQ schema were strengthened for CRM, scheduler, bulk sender, and templates on 2026-09-03, then retargeted to WA Web commercial phrasing on 2026-09-13 after fresh public SERP checks.

## Evidence Gates

| Gate | Current | Target before claiming progress | Status |
| --- | --- | --- | --- |
| Google indexation | Requested for homepage and CRM page; IndexNow accepted 12 URLs | Search Console says indexed with matching canonical | pending crawl |
| Public query visibility | 4/11 visible or partial tracked rows | At least 6/11 visible or partial, including 2 non-branded rows | not ready |
| Authority evidence | 1 verified listing, 5 ready/gated targets | At least 6 crawlable third-party citations | not ready |
| CWS authority | Updated draft is pending review; public listing can still show older title/snippet | Approved listing shows WA Web Utils title, current website/support/privacy URLs, and correct screenshots | pending review |
| Conversion tracking | GA4 pageview and install/login/support/pricing-market events added on 2026-09-13 | Events visible in GA4 Realtime and usable for campaign/source evaluation | pending GA verification |
| Commercial outcome | No proven SEO-driven install/sales lift recorded yet | Search Console clicks, CWS install clicks, or GA4 install events improve from tracked WA Web query/page sources | not ready |

## P0 Execution

| Priority | Workstream | Action | Proof required |
| --- | --- | --- | --- |
| P0 | Search Console | Reinspect `/use-cases/whatsapp-web-crm.html` and `/` after 48-72 hours. | Indexed status and Google-selected canonical. |
| P0 | Chrome Web Store | Recheck review status daily until approved; after approval, verify public title, promo tile, screenshots, website/support/privacy URLs, and pricing language. | Public CWS listing matches the approved draft. |
| P0 | Brand strategy | Decide whether to keep `WA Web Utils` after review or move to a more distinctive SEO title because another extension already owns public visibility for the same brand phrase. | Decision recorded before the next major store-listing update. |
| P0 | Content | Strengthen `chat-message-scheduler.html`, `chat-bulk-sender.html`, `chat-message-templates.html`, and `chat-crm.html` around exact commercial intent. | Retargeted locally on 2026-09-13 and enriched with HowTo schema on 2026-09-14; next proof is live deployment plus Search Console impression/query data. |
| P0 | Public visibility | Recheck the 11 queries in `seo/public-search-visibility-status.csv` weekly until GSC query data is strong enough. | Query, first visible position, result URL, and evidence note. |
| P0 | Authority | Build direct links to the CWS item and `/use-cases/whatsapp-web-crm.html`. | Public crawlable page with the right product name and URL. |
| P0 | CWS conversion | Replace reused screenshots with feature-specific CRM screenshots during the next listing update. | Public CWS screenshots show CRM, scheduler, templates, and bulk sender workflows. |

## P1 Content Expansion

| Target page | Primary intent | Update needed |
| --- | --- | --- |
| `/use-cases/chat-crm.html` | WA Web CRM for sales follow-ups | Retargeted on 2026-09-13; HowTo schema added on 2026-09-14; recheck Search Console after crawl. |
| `/use-cases/chat-message-scheduler.html` | WA Web scheduler Chrome extension | Retargeted on 2026-09-13; HowTo schema added on 2026-09-14; recheck Search Console after crawl. |
| `/use-cases/chat-bulk-sender.html` | WA Web bulk sender Chrome extension | Retargeted on 2026-09-13; HowTo schema added on 2026-09-14; recheck Search Console after crawl. |
| `/use-cases/chat-message-templates.html` | WA Web message templates | Retargeted on 2026-09-13; HowTo schema added on 2026-09-14; recheck Search Console after crawl. |

## Verification Commands

```sh
npm run seo:check
npm run seo:indexnow:record
rg -n "submitted for review|paid access|Paid plans|during the trial" .
rg -n "oajgkebdeioegjkaohcipgblnkjibple|WA Web Utils" index.html use-cases/*.html sitemap.xml
curl -I https://www.wawebplus.com/sitemap.xml
curl -I https://chromewebstore.google.com/detail/oajgkebdeioegjkaohcipgblnkjibple
```

## Source Files

- `SEO-GTM-PLAN.md`
- `seo/public-search-visibility-status.csv`
- `seo/authority-targets.csv`
- `seo/outreach-batch-20260903.csv`
- `sitemap.xml`
- `index.html`
- `use-cases/whatsapp-web-crm.html`
