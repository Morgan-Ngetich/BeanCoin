/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

// Load environment variables from the .env file located two directories up
dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    // Ensure the output directory is emptied before each build
    emptyOutDir: true,
    // Adjust the chunk size warning limit if necessary
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Customize chunk splitting
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split vendor code into separate chunks based on package name
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Ensure 'globalThis' is used instead of 'global' to avoid issues in modern environments
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    // Set up a proxy for API requests during development
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    // Include React plugin for Vite
    react(),
    // Load all environment variables prefixed with CANISTER_
    environment('all', { prefix: 'CANISTER_' }),
    // Load all environment variables prefixed with DFX_
    environment('all', { prefix: 'DFX_' }),
  ],
  test: {
    // Use jsdom as the test environment for Vitest
    environment: 'jsdom',
    // Specify the setup file for Vitest
    setupFiles: 'src/setupTests.js',
  },
  resolve: {
    // Define path aliases
    alias: [
      {
        find: 'declarations',
        replacement: fileURLToPath(
          new URL('../declarations', import.meta.url)
        ),
      },
      {
        find: 'chart.js',
        replacement: 'chart.js/auto',
      },
    ],
  },
});
