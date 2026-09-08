import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://127.0.0.1:4194', browserName: 'chromium', viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' },
  webServer: { command: 'pnpm exec vite preview --host 127.0.0.1 --port 4194 --strictPort', url: 'http://127.0.0.1:4194', reuseExistingServer: false },
});
