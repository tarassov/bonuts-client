import { describe, expect, it } from "vitest";

import { canPurchaseDonut } from "./donut-purchase";
import type { TDonut } from "@/types/model";

const donut = {
	available: true,
	price: 80,
} as TDonut;

describe("canPurchaseDonut", () => {
	it("allows an available reward when the balance covers its price", () => {
		expect(canPurchaseDonut(donut, 80)).toBe(true);
	});

	it("rejects unavailable and unaffordable rewards", () => {
		expect(canPurchaseDonut(donut, 79)).toBe(false);
		expect(canPurchaseDonut({ ...donut, available: false }, 100)).toBe(false);
		expect(canPurchaseDonut(donut)).toBe(false);
	});
});
