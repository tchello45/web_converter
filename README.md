# A converter for text, binary, and other formats

The converter consists of a Rust library and a Next.js frontend.

## Rust library

The Rust library is a simple converter that converts between text, binary, and hexadecimal formats.
To build the library, run `wasm-pack build --target bundler --out-name index --out-dir pkg`.
To package the library, run `npm pack` in the `pkg` directory.

## Next.js frontend

The Next.js frontend is a simple converter that converts between text, binary, and hexadecimal formats.
To install the dependencies, run `pnpm install` in the `frontend` directory.
To install the converter-module, run `pnpm install ../converter-module/pkg/converter-module-x.x.x.tgz` in the `frontend` directory.
To run the frontend, run `pnpm dev` in the `frontend` directory.
To build the frontend, run `pnpm build` in the `frontend` directory.

## Copyright

Copyright © 2025 Tilman Kurmayer. All rights reserved.
