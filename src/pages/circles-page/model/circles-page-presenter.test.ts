import { describe, expect, it } from "vitest";

import { getVisibleCircles } from "./circles-page-presenter";
import type { TCircle } from "@/types/model";

const circles: Array<TCircle> = [
	{ id: 1, name: "Engineering" },
	{ id: 2, name: "Product launch" },
	{ id: 3, name: "Culture crew" },
];

describe("getVisibleCircles", () => {
	it("returns every circle for an empty query", () => {
		expect(getVisibleCircles(circles, "")).toEqual(circles);
	});

	it("matches circle names without case sensitivity", () => {
		expect(getVisibleCircles(circles, "ENGINEER")).toEqual([circles[0]]);
	});

	it("trims the query before matching", () => {
		expect(getVisibleCircles(circles, "  launch  ")).toEqual([circles[1]]);
	});
});
