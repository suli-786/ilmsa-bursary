import { chromium } from 'playwright';
const OUT = '/tmp/claude-1000/-home-suleiman-code-ilmsa-bursary/7909e622-8d73-4ddc-a89d-5150ce40932d/scratchpad';
const URL = 'http://localhost:4321/hero';
const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage'] });
for (const [name, width] of [['foot2-mobile', 360], ['foot2-desktop', 1440]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errs=[]; page.on('console',m=>m.type()==='error'&&errs.push(m.text())); page.on('pageerror',e=>errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });
  const f = page.locator('.mt-footer');
  await f.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  // force any lazy media imgs to load, then confirm all decoded
  const imgs = await page.evaluate(async () => {
    const els=[...document.querySelectorAll('.mt-footer__media img, .mt-footer__mq-cell img')];
    await Promise.all(els.map(i=>i.complete?0:i.decode().catch(()=>0)));
    return els.filter(i=>!i.complete||i.naturalWidth===0).length;
  });
  const ox = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  await f.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`${name}: brokenImgs=${imgs} overflowX=${ox} consoleErrs=${errs.length}`);
  await page.close();
}
await browser.close();
