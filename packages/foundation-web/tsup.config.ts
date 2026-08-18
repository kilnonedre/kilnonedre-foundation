import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    map: 'src/map/index.ts',
    print: 'src/print/index.tsx',
  },
  format: ['esm'],
  dts: true,
  splitting: false,
  clean: true,
  bundle: true,
  banner: {
    js: '"use client";',
  },
})
