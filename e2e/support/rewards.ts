import type { ApiMock } from "./api-mock";
import * as donuts from "./donuts-page-data";
import * as store from "./store-page-data";

export function mockDonuts(api: ApiMock): void {
	let isPurchased = false;
	api.mock("GET", "/profile", { body: donuts.DONUTS_PROFILE_RESPONSE });
	api.mock("GET", "/accounts/10", { body: donuts.SELF_ACCOUNT_RESPONSE });
	api.mock("GET", "/donuts", (request) => {
		const query = new URL(request.url()).searchParams;
		const page = Number(query.get("page") ?? 1);
		const search = query.get("search_text")?.trim().toLowerCase() ?? "";
		const sort = query.get("sort") ?? "alphabet";
		const items = donuts.DONUTS_RESPONSE.data
			.filter((donut) => typeof donut.name === "string" && donut.name.toLowerCase().includes(search))
			.map((donut) => (isPurchased && donut.id === 2 ? { ...donut, on_stock: 3 } : donut))
			.sort((first, second) => {
				if (sort === "price_asc") return first.price - second.price;
				if (sort === "price_desc") return second.price - first.price;
				if (sort === "newest") return second.id - first.id;
				return (first.name ?? "").localeCompare(second.name ?? "");
			});
		return { body: { data: page === 1 ? items.slice(0, 2) : items.slice(2) }, headers: { "Per-Page": "2", Total: String(items.length) } };
	});
	for (const id of [2, 3]) api.mock("GET", `/donuts/${id}`, { body: { data: donuts.DONUTS_RESPONSE.data.find((donut) => donut.id === id) } });
	api.mock("POST", "/requests", () => {
		isPurchased = true;
		return { body: { data: [] }, status: 201 };
	});
}

export function mockStore(api: ApiMock): void {
	api.mock("GET", "/donuts", (request) => ({
		body: { data: Number(new URL(request.url()).searchParams.get("page") ?? 1) === 1 ? store.DONUTS_RESPONSE.data.slice(0, 2) : store.DONUTS_RESPONSE.data.slice(2) },
		headers: { "Per-Page": "2", Total: "3" },
	}));
}
