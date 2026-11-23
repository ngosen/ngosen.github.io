// Calls compose() in public/telex/telex.wasm (built from tools/telex-wasm). Plain JavaScript so
// the page and the Node scripts in tools/telex-wasm share it.

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * @param {WebAssembly.Instance} instance
 * @returns {(keys: string, final: boolean) => string}
 */
export function composeFrom(instance) {
  const { memory, alloc, dealloc, compose, output_ptr: outputPtr } = instance.exports;
  return (keys, final) => {
    const bytes = encoder.encode(keys);
    const ptr = alloc(bytes.length);
    new Uint8Array(memory.buffer, ptr, bytes.length).set(bytes);
    const len = compose(ptr, bytes.length, final ? 1 : 0);
    dealloc(ptr, bytes.length);
    return decoder.decode(new Uint8Array(memory.buffer, outputPtr(), len));
  };
}

/**
 * @param {BufferSource} bytes the contents of telex.wasm
 */
export async function createCompose(bytes) {
  const { instance } = await WebAssembly.instantiate(bytes, {});
  return composeFrom(instance);
}
