import { describe, expect, it } from "vitest";

import { providesInfiniteList } from "./rtk-cache-utils";

describe("providesInfiniteList", () => {
	it("provides the list and item tags from every loaded page", () => {
		const result = providesInfiniteList("Event")(
			{
				pages: [{ data: [{ id: "1" }, { id: "2" }] }, { data: [{ id: "3" }] }],
				pageParams: [1, 2],
			},
			undefined
		);

		expect(result).toEqual([
			{ type: "Event", id: "LIST" },
			{ type: "Event", id: "1" },
			{ type: "Event", id: "2" },
			{ type: "Event", id: "3" },
		]);
	});

	it("provides the list tag when data is unavailable", () => {
		expect(providesInfiniteList("Event")(undefined, undefined)).toContainEqual({ type: "Event", id: "LIST" });
	});
});
