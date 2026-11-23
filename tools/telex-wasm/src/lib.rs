//! Exposes bamboo-core's Telex composition to the page, so the typing demo runs the same core the
//! input method uses instead of a re-implementation. Plain exports without wasm-bindgen: the page
//! writes the keys into memory from `alloc`, calls `compose`, and reads the result at `output_ptr`.

use bamboo_core::{Config, Engine, InputMethodPreset, Mode, OutputOptions, ToneStyle, W2uMode};

static mut OUTPUT: String = String::new();

/// The settings of `default_config()` in bamboo-rs of ngosen/ngosen, so the demo types like the
/// installed input method.
fn config() -> Config {
    Config::builder()
        .free_tone_marking(true)
        .tone_style(ToneStyle::Modern)
        .auto_correct(false)
        .w2u_mode(W2uMode::Everywhere)
        .build()
}

/// What the keystrokes of one word become. With `final` set, a word that cannot be Vietnamese is
/// given back as typed, which is what the input method does when the word ends.
fn compose_word(keys: &str, final_: bool) -> String {
    let mut engine = Engine::from_preset_with_config(InputMethodPreset::Telex, config());
    engine.process_str(keys, Mode::Vietnamese);
    let out = engine.get_processed_str(OutputOptions::NONE);
    if final_ && !engine.is_valid_word() {
        // "đ" is kept even in a non-Vietnamese sequence because abbreviations use it a lot.
        let lower = engine.get_processed_str(OutputOptions::LOWER_CASE);
        if !lower.contains('đ') {
            return keys.to_string();
        }
    }
    out
}

/// Reserves `len` bytes for the caller to write the keys into.
#[unsafe(no_mangle)]
pub extern "C" fn alloc(len: usize) -> *mut u8 {
    let mut buf = Vec::<u8>::with_capacity(len);
    let ptr = buf.as_mut_ptr();
    std::mem::forget(buf);
    ptr
}

/// Frees a buffer from `alloc`.
///
/// # Safety
/// `ptr` and `len` must come from one `alloc` call.
#[unsafe(no_mangle)]
pub unsafe extern "C" fn dealloc(ptr: *mut u8, len: usize) {
    drop(unsafe { Vec::from_raw_parts(ptr, 0, len) });
}

/// Composes the UTF-8 keys at `ptr` and returns the byte length of the result, which stays at
/// `output_ptr()` until the next call.
///
/// # Safety
/// `ptr` must point to `len` bytes written by the caller.
#[unsafe(no_mangle)]
pub unsafe extern "C" fn compose(ptr: *const u8, len: usize, final_: u32) -> usize {
    let bytes = unsafe { std::slice::from_raw_parts(ptr, len) };
    let keys = std::str::from_utf8(bytes).unwrap_or("");
    let result = compose_word(keys, final_ != 0);
    // The module is single-threaded; nothing else holds a reference to OUTPUT.
    unsafe {
        let output = &mut *std::ptr::addr_of_mut!(OUTPUT);
        *output = result;
        output.len()
    }
}

/// Where the result of the last `compose` call starts.
#[unsafe(no_mangle)]
pub extern "C" fn output_ptr() -> *const u8 {
    unsafe { (*std::ptr::addr_of!(OUTPUT)).as_ptr() }
}
