//go:build js && wasm

// Exposes bamboo-core's Telex composition to the page, so the typing demo runs the same core the
// input method uses instead of a re-implementation.
package main

import (
	"strings"
	"syscall/js"

	bamboo "github.com/LotusInputMethod/bamboo-core"
)

// compose returns what the keystrokes of one word become. With final set, a word that cannot be
// Vietnamese is given back as typed, which is what the input method does when the word ends.
func compose(keys string, final bool) string {
	engine := bamboo.NewEngine(
		bamboo.ParseInputMethod(bamboo.InputMethodDefinitions, "Telex"),
		bamboo.EstdFlags,
	)
	engine.ProcessString(keys, bamboo.VietnameseMode)
	out := engine.GetProcessedString(bamboo.VietnameseMode)
	if final && !engine.IsValid(true) {
		// "đ" is kept even in a non-Vietnamese sequence because abbreviations use it a lot.
		lower := engine.GetProcessedString(bamboo.VietnameseMode | bamboo.LowerCase)
		if !strings.ContainsRune(lower, 'đ') {
			return keys
		}
	}
	return out
}

func main() {
	js.Global().Set("ngosenCompose", js.FuncOf(func(_ js.Value, args []js.Value) any {
		if len(args) < 1 {
			return ""
		}
		final := len(args) > 1 && args[1].Truthy()
		return compose(args[0].String(), final)
	}))
	select {}
}
