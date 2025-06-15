import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Don't add buffer/process aliases here if using nodePolyfills
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
});
