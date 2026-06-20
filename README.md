# WA Web Plus Website

Static marketing website for WA Web Plus.

## Local structure

- `index.html` — landing page
- `support.html` — support page
- `privacy.html` — privacy policy
- `terms.html` — terms page
- `styles.css` — shared site styling
- `app.js` — shared site links and small behavior
- `assets/` — logo and illustrative portrait assets
- `CNAME` — custom domain for GitHub Pages

## Deploy

This repo is designed for GitHub Pages.

After pushing to GitHub:

1. Enable GitHub Pages for the repository.
2. Keep the custom domain from `CNAME`.
3. Point DNS for `www.wawebplus.com` to GitHub Pages.
4. Optionally redirect `wawebplus.com` to `www.wawebplus.com`.

## Current site values

The site currently uses:

- Chrome Web Store install URL in `app.js`
- ExtensionPay login URL in `app.js`
- Support email in `app.js`

Update those values only if the live install target, login flow, or support address changes.
