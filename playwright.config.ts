import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: process.env.CI ? 2 : 4,
	timeout: 30_000,
	expect: { timeout: 10_000 },
	reporter: [["list"], ["html", { open: "never" }]],
	use: {
		baseURL: "http://localhost:4173",
		browserName: "chromium",
		viewport: { width: 1280, height: 720 },
		serviceWorkers: "block",
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},
	webServer: {
		command: "yarn dev:e2e",
		url: "http://localhost:4173",
		reuseExistingServer: false,
		timeout: 120_000,
	},
});
