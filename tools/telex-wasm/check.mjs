// Runs the built telex.wasm in Node and compares it with what Telex must produce.
// Usage: node tools/telex-wasm/check.mjs
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../../public/telex/', import.meta.url));
await import(`${dir}wasm_exec.js`);

const go = new globalThis.Go();
const { instance } = await WebAssembly.instantiate(await readFile(`${dir}telex.wasm`), go.importObject);
go.run(instance);

// [keystrokes, expected while typing, expected once the word has ended]
const cases = [
  ['tieengs', 'tiếng', 'tiếng'],
  ['vieejt', 'việt', 'việt'],
  ['Vieejt', 'Việt', 'Việt'],
  ['ddaay', 'đây', 'đây'],
  ['nguwowif', 'người', 'người'],
  ['dduwowngf', 'đường', 'đường'],
  ['gox', 'gõ', 'gõ'],
  ['toans', 'toán', 'toán'],
  ['khoong', 'không', 'không'],
  ['Ngos', 'Ngó', 'Ngó'],
  ['Sen', 'Sen', 'Sen'],
  ['linux', 'linũ', 'linux'],
  // The legends on the home page's Telex keyboard.
  ['as', 'á', 'á'],
  ['af', 'à', 'à'],
  ['ar', 'ả', 'ả'],
  ['ax', 'ã', 'ã'],
  ['aj', 'ạ', 'ạ'],
  ['asz', 'a', 'a'],
  ['aa', 'â', 'â'],
  ['ee', 'ê', 'ê'],
  ['oo', 'ô', 'ô'],
  ['aw', 'ă', 'ă'],
  ['ow', 'ơ', 'ơ'],
  ['uw', 'ư', 'ư'],
  ['dd', 'đ', 'đ'],
];

let failed = 0;
for (const [keys, typing, done] of cases) {
  const gotTyping = globalThis.ngosenCompose(keys, false);
  const gotDone = globalThis.ngosenCompose(keys, true);
  const ok = gotTyping === typing && gotDone === done;
  if (!ok) failed += 1;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${keys} -> ${gotTyping} / ${gotDone}${ok ? '' : ` (want ${typing} / ${done})`}`);
}
console.log(`${cases.length - failed}/${cases.length} as expected`);
process.exit(failed ? 1 : 0);
