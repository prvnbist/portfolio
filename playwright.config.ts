import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.E2E_PORT ?? 4319)
const CI = !!process.env.CI

/**
 * End-to-end smoke and accessibility checks against the production build. Run `pnpm build` first;
 * the web server serves .output/. Locally this uses the installed Google Chrome; CI installs
 * Playwright's Chromium.
 */
export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	forbidOnly: CI,
	retries: CI ? 1 : 0,
	reporter: CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	use: {
		...devices['Desktop Chrome'],
		...(CI ? {} : { channel: 'chrome' }),
		baseURL: `http://127.0.0.1:${PORT}`,
	},
	webServer: {
		command: 'node .output/server/index.mjs',
		env: { PORT: String(PORT) },
		url: `http://127.0.0.1:${PORT}/`,
		reuseExistingServer: !CI,
		timeout: 60_000,
	},
})
