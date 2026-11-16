import { ApiMock } from "./support/api-mock";
import { expect, test } from "./support/fixtures";

// A separate context lets these tests inspect deliberate guard violations without
// aborting the enclosing test. The app fixture uses test.abort for this callback.
test("API router matches exact methods and paths and allows overrides", async ({ browser }) => {
	const context = await browser.newContext();
	const unexpected: string[] = [];
	const api = new ApiMock(context, (message) => unexpected.push(message));
	try {
		await api.install();
		api.mock("GET", "/probe", { body: { value: "default" } });
		api.mock("GET", "/probe", { body: { value: "override" }, status: 201, headers: { Total: "1" } });
		const page = await context.newPage();
		const response = await page.goto("http://localhost:4173/api/v1/probe?page=2");
		expect(await response!.json()).toEqual({ value: "override" });
		expect(response!.status()).toBe(201);
		expect(response!.headers().total).toBe("1");
		await expect(page.goto("http://localhost:4173/api/v1/probe/extra")).rejects.toThrow();
		expect(unexpected).toHaveLength(1);
		expect(unexpected[0]).toContain("Unmocked API request: GET http://localhost:4173/api/v1/probe/extra");
	} finally {
		await context.close();
	}
});

test("API router blocks unknown POSTs and reports URL and body", async ({ browser }) => {
	const context = await browser.newContext();
	const unexpected: string[] = [];
	const api = new ApiMock(context, (message) => unexpected.push(message));
	try {
		await api.install();
		api.mock("GET", "/probe", { body: {} });
		const page = await context.newPage();
		await page.goto("http://localhost:4173/api/v1/probe");
		const isBlocked = await page.evaluate(async () => {
			try {
				await fetch("/api/v1/probe?tenant=test-tenant", { method: "POST", body: JSON.stringify({ value: "test" }) });
				return false;
			} catch {
				return true;
			}
		});
		expect(isBlocked).toBe(true);
		expect(unexpected).toHaveLength(1);
		expect(unexpected[0]).toContain("Unmocked API request: POST http://localhost:4173/api/v1/probe?tenant=test-tenant");
		expect(unexpected[0]).toContain('Body: {"value":"test"}');
		expect(unexpected[0]).toContain("api.mock(method, path, response)");
	} finally {
		await context.close();
	}
});
