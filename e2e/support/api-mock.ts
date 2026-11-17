import type { BrowserContext, Request, Route } from "@playwright/test";

export type TMockResponse = { body: unknown; status?: number; headers?: Record<string, string> };
type TMockHandler = (request: Request) => TMockResponse | Promise<TMockResponse>;
type TMockRoute = { method: string; path: string; handler: TMockHandler };

/** Exact API paths and methods only. Later registrations override earlier defaults. */
export class ApiMock {
	private routes: TMockRoute[] = [];
	readonly requests: Request[] = [];
	readonly unexpected: string[] = [];

	constructor(
		private readonly context: BrowserContext,
		private readonly onUnexpected: (message: string) => void
	) {}

	async install(): Promise<void> {
		await this.context.route("**/*", async (route: Route) => {
			const request = route.request();
			const url = new URL(request.url());
			if (url.pathname !== "/api" && !url.pathname.startsWith("/api/")) {
				await route.continue();
				return;
			}
			this.requests.push(request);
			const match = this.routes.findLast((mock) => mock.method === request.method() && `/api/v1${mock.path}` === url.pathname);
			if (!match) {
				const message = `Unmocked API request: ${request.method()} ${request.url()}\nBody: ${request.postData() ?? "<empty>"}\nRegister this endpoint explicitly with api.mock(method, path, response).`;
				this.unexpected.push(message);
				await route.abort("blockedbyclient");
				this.onUnexpected(message);
				return;
			}
			const response = await match.handler(request);
			await route.fulfill({ status: response.status ?? 200, json: response.body, headers: { "Access-Control-Expose-Headers": "Per-Page, Total", ...response.headers } });
		});
	}

	mock(method: string, path: string, response: TMockResponse | TMockHandler): void {
		this.routes.push({ method, path, handler: typeof response === "function" ? response : () => response });
	}

	calls(method: string, path: string): Request[] {
		return this.requests.filter((request) => request.method() === method && new URL(request.url()).pathname === `/api/v1${path}`);
	}
}
