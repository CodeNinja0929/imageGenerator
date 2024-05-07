import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      // This allows you to import modules as if `src` is the root.
      // For instance: import something from 'components/MyComponent'
      // instead of '../../../components/MyComponent'
      '@': '/src',
      $common: '/src/components/common',
    },
  },
  build: {
    rollupOptions: {
      external: ['node_modules'],
    },
  },
  plugins: [react()],
});
