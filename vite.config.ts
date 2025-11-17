import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages base path (repository name). Adjust if deploying to user/organization root.
const base = '/workshops-17-11/';

export default defineConfig({
  plugins: [react()],
  base,
});
