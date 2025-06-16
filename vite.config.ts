import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'lib'),
    },
    dedupe: ['@decloudlabs/skynet'],
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    exclude: ['@decloudlabs/skynet']
  },
  build: {
    commonjsOptions: {
      include: [/@decloudlabs\/skynet/, /node_modules/],
    },
  },
  esbuild: {
    target: 'esnext',
  },
});