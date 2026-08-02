import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['services/**/*.test.ts', 'components/**/*.test.{ts,tsx}'],
  },
});
