
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 確保在 GitHub Pages 環境下路徑正確
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
