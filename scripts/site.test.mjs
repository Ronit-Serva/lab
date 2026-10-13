import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
const root = resolve('dist');
const files = readdirSync(root, { recursive: true }).filter(file => file.endsWith('.html'));
const pages = files.map(file => ({ file, html: readFileSync(join(root, file), 'utf8') }));
const decode = value => value.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
test('all generated internal navigation and reading anchors resolve', () => {
  let checked = 0;
  for (const { file, html } of pages) {
    const base = new URL(file.replace(/index\.html$/, ''), 'https://lab.test/');
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const url = new URL(decode(match[1]), base);
      if (url.origin !== base.origin) continue;
      const path = decodeURIComponent(url.pathname);
      const target = resolve(root, `.${path.endsWith('/') ? `${path}index.html` : path}`);
      assert.ok(target.startsWith(root), `Unsafe path in ${file}`);
      assert.ok(existsSync(target), `${file} links to missing ${relative(root, target)}`);
      if (url.hash) {
        const fragment = decodeURIComponent(url.hash.slice(1));
        assert.ok(readFileSync(target, 'utf8').includes(`id="${fragment}"`), `${file}: missing anchor ${fragment}`);
      }
      checked++;
    }
  }
  assert.ok(checked > 100, 'Expected to inspect complete site navigation');
});
test('drafts are absent from pages, search and sitemap', () => {
  const all = pages.map(page => page.html).join('\n');
  assert.ok(!existsSync(join(root, 'writing/writing-template/index.html')));
  assert.ok(!all.includes('Replace with your article title'));
  assert.ok(!readFileSync(join(root, 'sitemap.xml'), 'utf8').includes('writing-template'));
});
test('every page has one primary heading, language, description and working skip target', () => {
  for (const { file, html } of pages) {
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file} primary heading`);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /id="main-content"/);
    assert.match(html, /href="#main-content"/);
    if (file !== '404.html') assert.match(html, /rel="canonical"/);
  }
});
test('project claims preserve their documented status and no email is exposed', () => {
  assert.match(readFileSync(join(root, 'projects/agent-payment-architecture/index.html'), 'utf8'), /Concept/);
  assert.match(readFileSync(join(root, 'projects/handwriting-recognition/index.html'), 'utf8'), /In development/);
  assert.match(readFileSync(join(root, 'projects/personal-finance-app/index.html'), 'utf8'), /Built · self-reported/);
  for (const { html } of pages) assert.ok(!html.includes('ronitkumar.serva@gmail.com'));
});
