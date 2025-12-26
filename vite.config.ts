
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 確保在 GitHub Pages 環境下路徑正確
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 移除 minify: 'terser'，改用預設的 esbuild 即可
    minify: 'esbuild'
  }
});
