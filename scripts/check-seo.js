const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sitemapPath = path.join(root, 'sitemap.xml');
const cwsId = 'mmkkmeiogfmoipjidmcaddbccdgmjipa';
const commercialPages = new Set([
  'use-cases/whatsapp-web-crm.html',
  'use-cases/chat-crm.html',
  'use-cases/chat-message-scheduler.html',
  'use-cases/chat-bulk-sender.html',
  'use-cases/chat-message-templates.html'
]);
const unsupportedClaims = /free trial|7-day trial|during the trial/i;

function fail(issues) {
  console.error(`WA Web CRM SEO check failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

function sitemapUrls() {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function localPathFromUrl(url) {
  const prefix = 'https://www.wawebplus.com/';
  if (!url.startsWith(prefix)) return '';
  const rel = url.slice(prefix.length);
  return rel ? rel : 'index.html';
}

const issues = [];
const urls = sitemapUrls();

if (urls.length !== 12) issues.push(`sitemap should contain 12 URLs, found ${urls.length}`);

for (const url of urls) {
  const rel = localPathFromUrl(url);
  if (!rel) {
    issues.push(`sitemap URL is not on www.wawebplus.com: ${url}`);
    continue;
  }

  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    issues.push(`sitemap URL has no local file: ${rel}`);
    continue;
  }

  if (!rel.endsWith('.html')) continue;

  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('<title>')) issues.push(`${rel}: missing title`);
  if (!html.includes('name="description"')) issues.push(`${rel}: missing meta description`);
  if (!html.includes(`rel="canonical" href="${url}"`)) issues.push(`${rel}: canonical does not match sitemap URL`);
  if (!html.includes(cwsId)) issues.push(`${rel}: missing current Chrome Web Store ID`);
  if (unsupportedClaims.test(html)) issues.push(`${rel}: contains unsupported trial claim`);
  if (commercialPages.has(rel) && !html.includes('"@type": "FAQPage"')) {
    issues.push(`${rel}: commercial page missing FAQ schema`);
  }
}

const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://www.wawebplus.com/sitemap.xml')) {
  issues.push('robots.txt missing sitemap directive');
}

if (issues.length) fail(issues);

console.log('# WA Web CRM SEO Check');
console.log('');
console.log(`Sitemap URLs: ${urls.length}`);
console.log(`Commercial FAQ pages: ${commercialPages.size}`);
console.log('Status: PASS');
