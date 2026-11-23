import { mockDashboard } from "./support/dashboard-page";
import { expect, test, visitAuthorized } from "./support/fixtures";

const payload = { code: "test-code", state: "test-state", device_id: "test-device", code_verifier: "test-verifier" };
const callback = "/oauth/vk?code=test-code&state=test-state&deviceId=test-device";

for (const flow of ["login", "connect"]) {
	test(`allows ${flow === "login" ? "anonymous" : "authenticated"} VK ${flow} callback`, async ({ page, api }) => {
		mockDashboard(api);
		let release!: () => void;
		const pending = new Promise<void>((resolve) => {
			release = resolve;
		});
		api.mock("POST", `/vk/${flow}`, async () => {
			await pending;
			return { body: flow === "login" ? { auth_token: "vk-auth-token", currentTenant: "test-tenant", tenants: [{ name: "test-tenant" }] } : { vk_user_id: "12345" } };
		});
		try {
			await visitAuthorized(page, callback, {
				auth_token: flow === "login" ? undefined : "test-auth-token",
				tenant: flow === "login" ? undefined : "test-tenant",
				"vk-auth-flow": flow,
				"vk-code-verifier": "test-verifier",
			});
			await expect(page).toHaveURL(/\/oauth\/vk\?/);
			await expect(page.getByTestId("vk-callback-page")).toBeVisible();
			await expect(page.getByTestId("vk-callback-title")).not.toBeEmpty();
		} finally {
			release();
		}
	});
	test(`sends ${flow} payload for VK auth`, async ({ page, api }) => {
		mockDashboard(api);
		api.mock("POST", `/vk/${flow}`, { body: flow === "login" ? { auth_token: "vk-auth-token", currentTenant: "test-tenant", tenants: [{ name: "test-tenant" }] } : { vk_user_id: "12345" } });
		await visitAuthorized(page, callback, {
			auth_token: flow === "login" ? undefined : "test-auth-token",
			tenant: flow === "login" ? undefined : "test-tenant",
			"vk-auth-flow": flow,
			"vk-code-verifier": "test-verifier",
		});
		await expect.poll(() => api.calls("POST", `/vk/${flow}`).length).toBeGreaterThan(0);
		for (const request of api.calls("POST", `/vk/${flow}`)) expect(request.postDataJSON()).toMatchObject(payload);
	});
}
