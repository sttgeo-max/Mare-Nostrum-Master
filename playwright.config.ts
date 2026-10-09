import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './qa/e2e',
  testMatch: /.*\.e2e\.ts/,
  use: {
    baseURL: 'http://localhost:3000',
  },
});
