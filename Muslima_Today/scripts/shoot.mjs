// shoot.mjs — VISUAL verification for the Muslimah Today build.
// Serves dist/, screenshots the page at mobile + desktop, runs axe a11y, writes a report.
//   node Muslima_Today/scripts/shoot.mjs            # screenshot + axe the built /MT/ page
//   node Muslima_Today/scripts/shoot.mjs --smoke    # just prove Chromium launches (no page needed)
//   MT_PATH=/MT/ node ...                           # override the page path
// Screenshots + report → Muslima_Today/.verify/ (gitignored). Exit non-zero on console errors
// or serious/critical a11y violations, so the loop can gate on it.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));   // repo root
const DIST = join(ROOT, 'dist');
const OUT  = fileURLToPath(new URL('../.verify/', import.meta.url)); // Muslima_Today/.verify
const PAGE = process.env.MT_PATH || '/MT/';
const SMOKE = process.argv.includes('--smoke');
const launchOpts = { args: ['--no-sandbox', '--disable-dev-shm-usage'] };

if (SMOKE) {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage();
  await p.setContent('<h1>ok</h1>');
  console.log('SMOKE OK — Chromium launched; title =', await p.title() || '(none)');
  await b.close();
  process.exit(0);
}

// --- tiny static file server over dist/ ---
const TYPES = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mjs':'text/javascript',
  '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp',
  '.avif':'image/avif', '.gif':'image/gif', '.ico':'image/x-icon', '.json':'application/json',
  '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf' };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const fp = normalize(join(DIST, p));
    if (!fp.startsWith(DIST)) { res.writeHead(403); return res.end(); }
    const buf = await readFile(fp);
    res.writeHead(200, { 'content-type': TYPES[extname(fp).toLowerCase()] || 'application/octet-stream' });
    res.end(buf);
  } catch { res.writeHead(404); res.end('not found'); }
});
await new Promise((r) => server.listen(0, r));
const BASE = `http://localhost:${server.address().port}`;

await mkdir(OUT, { recursive: true });
let axe = '';
try { axe = await readFile(join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8'); } catch {}

const browser = await chromium.launch(launchOpts);
const report = {};
let bad = 0;
for (const [name, viewport] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1440, height: 900 }]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  const resp = await page.goto(BASE + PAGE, { waitUntil: 'networkidle' }).catch((e) => { consoleErrors.push('goto: ' + e.message); return null; });
  await page.screenshot({ path: join(OUT, `${name}.png`), fullPage: true });
  let violations = [];
  if (axe) {
    await page.addScriptTag({ content: axe });
    const a = await page.evaluate(async () => await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] }));
    violations = a.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help }));
  }
  report[name] = { status: resp?.status() ?? null, consoleErrors, violations };
  if (consoleErrors.length) bad = 1;
  if (violations.some((v) => v.impact === 'serious' || v.impact === 'critical')) bad = 1;
  await ctx.close();
}
await browser.close();
server.close();
await writeFile(join(OUT, 'report.json'), JSON.stringify(report, null, 2));

for (const k of Object.keys(report)) {
  const r = report[k];
  console.log(`\n[${k}] http ${r.status} · console-errors ${r.consoleErrors.length} · a11y ${r.violations.length}`);
  r.violations.forEach((v) => console.log(`   - ${v.impact || '?'} ${v.id} (${v.nodes}) ${v.help}`));
  r.consoleErrors.slice(0, 5).forEach((e) => console.log('   console: ' + e));
}
console.log(`\nScreenshots → Muslima_Today/.verify/{mobile,desktop}.png · report → .verify/report.json`);
console.log(bad ? 'VISUAL: FAIL (console errors or serious a11y)' : 'VISUAL: ok');
process.exit(bad);
