import { defineConfig } from '@playwright/test';
import base from '../../playwright.config';

// Audit-only isolation. Build first; never reuse an unidentified preview server.
export default defineConfig({
  ...base,
  testDir: '../../tests/browser',
  outputDir: '../../test-results/lead-baseline',
  use: { ...base.use, baseURL: 'http://127.0.0.1:4187' },
  webServer: {
    command: 'pnpm exec vite preview --host 127.0.0.1 --port 4187 --strictPort',
    cwd: process.cwd(),
    url: 'http://127.0.0.1:4187',
    reuseExistingServer: false,
  },
});
