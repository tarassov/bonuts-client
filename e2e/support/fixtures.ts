import { ApiMock } from "./api-mock";
import { DASHBOARD_TENANTS_RESPONSE } from "./dashboard-page";
import { PROFILE_RESPONSE } from "./fixtures/profile-response";
import { TENANT_RESPONSE } from "./fixtures/tenant-response";
import type { Page } from "@playwright/test";
import { test as base, expect } from "@playwright/test";

type TFixtures = { api: ApiMock };
export const test = base.extend<TFixtures>({
	api: [
		async ({ context }, use, testInfo) => {
			const api = new ApiMock(context, (message) => base.abort(message));
			await api.install();
			api.mock("GET", "/profile", { body: PROFILE_RESPONSE });
			api.mock("GET", "/tenants", { body: DASHBOARD_TENANTS_RESPONSE });
			api.mock("GET", "/tenant/current", { body: TENANT_RESPONSE });
			api.mock("POST", "/user_activity/heartbeat", { body: {} });
			await use(api);
			if (testInfo.status === "passed") {
				expect(api.unexpected, "All API requests must have explicit mocks").toEqual([]);
			}
		},
		{ auto: true },
	],
});
export { expect };

export async function visitAuthorized(page: Page, path: string, settings: Record<string, unknown> = {}, theme = "light"): Promise<void> {
	await page.addInitScript(
		({ settings, theme }) => {
			if (!sessionStorage.getItem("e2e-initialized")) {
				localStorage.setItem("settings", JSON.stringify(settings));
				localStorage.setItem("theme", theme);
				sessionStorage.setItem("e2e-initialized", "true");
			}
		},
		{ settings: { auth_token: "test-auth-token", tenant: "test-tenant", locale: "en", ...settings }, theme }
	);
	await page.goto(path);
}

export const viewports = [
	{ name: "desktop", width: 1280, height: 720 },
	{ name: "mobile", width: 375, height: 812 },
];
