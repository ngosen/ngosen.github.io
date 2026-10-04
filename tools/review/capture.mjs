// Full-document screenshots of every page through Firefox WebDriver BiDi, for design review.
// Start the site (npm run preview -- --port 4391) and a headless Firefox first:
//   firefox --headless --no-remote --profile <empty dir> --remote-debugging-port 9334 about:blank
// Usage: node tools/review/capture.mjs <port> <outDir> <suffix>   (ONLY=home,post limits the pages)
import { writeFile } from 'node:fs/promises';

const [port, outDir, suffix] = process.argv.slice(2);
const base = 'http://127.0.0.1:4391';
const pages = [
  ['home', '/'],
  ['cai-dat', '/cai-dat/'],
  ['khac-gi', '/khac-gi-ban-goc/'],
  ['blog', '/blog/'],
  ['post', '/blog/vi-sao-go-tieng-viet-bi-nuot-chu/'],
  ['en', '/en/'],
  ['404', '/404.html'],
];
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;

const ws = new WebSocket(`ws://127.0.0.1:${port}/session`);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = () => reject(new Error('cannot connect'));
});
let nextId = 1;
const pending = new Map();
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const waiter = pending.get(message.id);
  if (!waiter) return;
  pending.delete(message.id);
  if (message.type === 'error') waiter.reject(new Error(`${message.error}: ${message.message}`));
  else waiter.resolve(message.result);
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

await send('session.new', { capabilities: {} });
const context = (await send('browsingContext.getTree', {})).contexts[0].context;
const evaluate = async (expression) => {
  const result = await send('script.evaluate', {
    expression,
    target: { context },
    awaitPromise: true,
    resultOwnership: 'none',
  });
  if (result.type === 'exception') throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const save = async (name, origin) => {
  const result = await send('browsingContext.captureScreenshot', { context, origin });
  const file = `${outDir}/${name}.png`;
  await writeFile(file, Buffer.from(result.data, 'base64'));
  return file;
};

for (const [width, label] of [
  [1440, 'desktop'],
  [390, 'mobile'],
]) {
  await send('browsingContext.setViewport', { context, viewport: { width, height: 844 } });
  for (const [name, path] of pages) {
    if (only && !only.includes(name)) continue;
    await send('browsingContext.navigate', { context, url: base + path, wait: 'complete' });
    await evaluate('document.fonts.ready.then(() => true)');
    // The home page is caught mid-phrase so the sheet shows composed Vietnamese.
    await evaluate(`new Promise((r) => setTimeout(() => r(true), ${name === 'home' ? 1500 : 200}))`);
    if (name === 'home') await save(`${name}-${label}${suffix}-first-viewport`, 'viewport');
    await save(`${name}-${label}${suffix}`, 'document');
    const info = await evaluate(`JSON.stringify({
      height: document.documentElement.scrollHeight,
      dark: matchMedia('(prefers-color-scheme: dark)').matches,
      footerBottom: Math.round(document.querySelector('footer').getBoundingClientRect().bottom + scrollY),
      typed: document.querySelector('[data-demo-out]')?.textContent ?? null,
    })`);
    console.log(`${name}-${label}${suffix}`, info);
  }
}
await send('session.end', {});
ws.close();
process.exit(0);
