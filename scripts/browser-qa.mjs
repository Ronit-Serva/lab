import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
mkdirSync('qa', { recursive: true });
const origin = 'http://127.0.0.1:4321';
const routes = ['/', '/explore/', '/explore/agentic-payments-and-trust/', '/explore/handwriting-generalization/', '/projects/', '/projects/personal-finance-app/', '/projects/handwriting-recognition/', '/projects/agent-payment-architecture/', '/writing/', '/story/', '/contact/'];
const failures = [];
const evidence = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => failures.push(error.message));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(origin)) failures.push(`${response.status()} ${response.url()}`); });
  for (const width of [1440, 1024, 800, 390, 320]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 960 });
    for (const route of routes) {
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => ({
        width: innerWidth,
        document: document.documentElement.scrollWidth,
        h1: document.querySelector('h1')?.getBoundingClientRect().width,
        image: [...document.images].every(img => img.complete && img.naturalWidth > 0),
        brokenElements: [...document.querySelectorAll('main *')].filter(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > innerWidth + 2 || r.left < -2);
        }).map(el => el.tagName + '.' + el.className).slice(0, 5),
      }));
      assert.ok(result.document <= width + 1, `${width} ${route} overflows ${result.document}: ${result.brokenElements}`);
      assert.ok(result.image, `Missing image ${route}`);
      evidence.push({ width, route, ...result });
    }
    await page.goto(origin, { waitUntil: 'networkidle' });
    if ([1440, 390].includes(width)) { await page.screenshot({ path: `qa/home-${width}.png`, fullPage: true }); await page.screenshot({ path: `qa/hero-${width}.png` }); }
  }
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto(`${origin}/explore/`);
  await page.locator('#content-query').fill('payments');
  assert.equal(await page.locator('[data-content-row]:visible').count(), 1);
  await page.locator('#content-topic').selectOption('Machine Learning');
  assert.equal(await page.locator('[data-content-row]:visible').count(), 0);
  assert.ok(await page.locator('[data-filter-empty]').isVisible());
  await page.getByRole('button', { name: 'Reset' }).click();
  assert.equal(await page.locator('[data-content-row]:visible').count(), 2);
  await page.locator('#content-status').selectOption('Researching');
  assert.equal(await page.locator('[data-content-row]:visible').count(), 1);
  await page.keyboard.press('Control+k');
  assert.ok(await page.locator('#site-search').isVisible());
  await page.locator('#site-query').fill('handwriting');
  assert.equal(await page.locator('[data-search-results] a').count(), 2);
  await page.locator('#site-query').fill('zznonexistent');
  assert.equal(await page.locator('[data-search-results] a').count(), 0);
  await page.keyboard.press('Escape');
  assert.ok(!await page.locator('#site-search').isVisible());
  await page.locator('[data-search-open]').click();
  await page.locator('#site-query').fill('finance');
  await page.locator('[data-search-results] a').first().click();
  assert.ok(page.url().includes('/projects/personal-finance-app/'));
  await page.goto(`${origin}/projects/agent-payment-architecture/`);
  await page.screenshot({ path: 'qa/architecture-desktop.png', fullPage: true });
  await page.goto(`${origin}/explore/agentic-payments-and-trust/`);
  await page.screenshot({ path: 'qa/investigation-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin);
  await page.locator('.mobile-menu summary').click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Projects' }).click();
  assert.ok(page.url().endsWith('/projects/'));
  await page.goto(origin);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content');
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(`${origin}/explore/`);
  assert.equal(await staticPage.locator('[data-content-row]').count(), 2);
  assert.ok(!await staticPage.locator('[data-filters]').isVisible());
  await staticPage.getByRole('link', { name: /How can AI agents/ }).click();
  assert.ok(staticPage.url().includes('agentic-payments-and-trust'));
  await noJs.close();
  assert.deepEqual(failures, []);
  writeFileSync('qa/browser-results.json', JSON.stringify({ checks: evidence.length, viewports: [1440,1024,800,390,320], consoleErrors: failures, evidence }, null, 2));
  console.log(`Browser QA passed: ${evidence.length} page/viewport checks; search, filters, keyboard, mobile menu and no-JavaScript navigation.`);
} finally { await browser.close(); }
