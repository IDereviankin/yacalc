#!/usr/bin/sh

cd ./yacalc_core
cargo build
mv ./target/wasm32-unknown-unknown/debug/yacalc_core.wasm ../parser.wasm
cd ..
~/.cargo/bin/wasm-snip --skip-producers-section --snip-rust-fmt-code --snip-rust-panicking-code ./parser.wasm -o ./parser.wasm
wasm-opt -Oz ./parser.wasm -o ./parser.wasm