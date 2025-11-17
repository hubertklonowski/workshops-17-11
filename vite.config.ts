import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages base path - use './' for relative paths
export default defineConfig({
  plugins: [react()],
  base: './',
});
