// Writes src/data/demo-steps.json: what the sheet shows after each key of the scripted phrases.
// The page plays these without loading the engine; it only fetches telex.wasm when a visitor types.
// Usage: node tools/telex-wasm/demo-steps.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createCompose } from '../../src/lib/telex.js';

const dir = fileURLToPath(new URL('../../public/telex/', import.meta.url));
const out = fileURLToPath(new URL('../../src/data/demo-steps.json', import.meta.url));
const compose = await createCompose(await readFile(`${dir}telex.wasm`));

const phrases = ['tieengs Vieejt', 'gox dduwowcj ngay', 'khoong nuoost chuwx'];

function render(raw) {
  const tokens = raw.match(/[A-Za-z]+|[^A-Za-z]+/g) ?? [];
  return tokens
    .map((token, index) => {
      if (!/^[A-Za-z]/.test(token)) return token;
      const stillTyping = index === tokens.length - 1;
      return compose(token, !stillTyping);
    })
    .join('');
}

const data = phrases.map((keys) => ({
  keys,
  steps: [...keys].map((_, index) => render(keys.slice(0, index + 1))),
}));

await writeFile(out, `${JSON.stringify(data, null, 2)}\n`);
for (const phrase of data) console.log(`${phrase.keys} -> ${phrase.steps.at(-1)}`);
process.exit(0);
