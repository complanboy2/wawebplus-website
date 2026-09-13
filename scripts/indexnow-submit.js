const fs = require('fs');
const https = require('https');
const path = require('path');

const root = path.join(__dirname, '..');
const sitemapPath = path.join(root, 'sitemap.xml');
const discoveryLogPath = path.join(root, 'seo', 'search-engine-discovery-submissions.csv');
const host = 'www.wawebplus.com';
const key = '731cb4d05233264ecdde7d682b4257c97398fcd7fb0e299b3626952e4c94d25e';
const keyLocation = `https://${host}/${key}.txt`;
const endpoint = 'https://api.indexnow.org/indexnow';

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : '';
}

function todayIso() {
  const override = argValue('--date');
  if (override) return override;

  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
}

function sitemapUrls() {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function csvCell(value) {
  const text = String(value || '');
  if (!/[",\n\r]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (quoted && char === '"' && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (!quoted && char === ',') {
      cells.push(cell);
      cell = '';
      continue;
    }
    cell += char;
  }

  cells.push(cell);
  return cells;
}

function discoveryRows() {
  if (!fs.existsSync(discoveryLogPath)) return [];
  return fs
    .readFileSync(discoveryLogPath, 'utf8')
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map(parseCsvLine);
}

function ensureDiscoveryLog() {
  if (fs.existsSync(discoveryLogPath)) return;
  fs.mkdirSync(path.dirname(discoveryLogPath), { recursive: true });
  fs.writeFileSync(
    discoveryLogPath,
    'date,channel,url_count,status_code,note,manual_google_action,next_action\n'
  );
}

function recordDiscoverySubmission({ date, urlCount, statusCode }) {
  ensureDiscoveryLog();
  const note =
    argValue('--note') ||
    'Full canonical sitemap URL set accepted by IndexNow after WA Web CRM keyword retargeting deployment';
  const nextAction =
    argValue('--next-action') ||
    'Monitor public query visibility and Search Console performance; Google indexing remains controlled by Search Console evidence';
  const row = [date, 'IndexNow', String(urlCount), String(statusCode), note, 'no', nextAction];
  const duplicate = discoveryRows().some(
    (existing) =>
      existing[0] === row[0] &&
      existing[1] === row[1] &&
      existing[2] === row[2] &&
      existing[3] === row[3] &&
      existing[4] === row[4]
  );

  if (duplicate) {
    console.log('Discovery submission already recorded; skipped duplicate ledger row.');
    return;
  }

  fs.appendFileSync(discoveryLogPath, `${row.map(csvCell).join(',')}\n`);
  console.log(`Recorded discovery submission in ${path.relative(root, discoveryLogPath)}.`);
}

function postJson(url, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body)
        },
        timeout: 30000
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: Buffer.concat(chunks).toString('utf8')
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy(new Error('timeout'));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const urls = sitemapUrls();
  if (!urls.length) {
    throw new Error('No URLs found in sitemap.xml');
  }

  const result = await postJson(endpoint, {
    host,
    key,
    keyLocation,
    urlList: urls
  });

  console.log(`Submitted ${urls.length} URLs to IndexNow.`);
  console.log(`HTTP ${result.statusCode}`);
  if (result.body.trim()) console.log(result.body.trim());

  if (![200, 202].includes(result.statusCode)) {
    process.exit(1);
  }

  if (process.argv.includes('--record')) {
    recordDiscoverySubmission({
      date: todayIso(),
      urlCount: urls.length,
      statusCode: result.statusCode
    });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
