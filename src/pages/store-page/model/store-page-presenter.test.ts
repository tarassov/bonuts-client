import { describe, expect, it } from "vitest";

import { StoreSort, StoreTab } from "./store-page.types";
import { getVisibleDonuts } from "./store-page-presenter";
import type { TDonut } from "@/types/model";

const createDonut = (id: number, name: string): TDonut => ({
	active: true,
	available: true,
	commentable: false,
	comments: [],
	id,
	likeable: false,
	liked: false,
	likes: [],
	name,
	on_stock: 1,
	price: 10,
	use_remains: true,
});

describe("getVisibleDonuts", () => {
	it("ignores rewards without a runtime name", () => {
		const invalidDonut = { ...createDonut(1, "Invalid"), name: undefined } as unknown as TDonut;
		const validDonut = createDonut(2, "Coffee voucher");

		expect(getVisibleDonuts([invalidDonut, validDonut], "", StoreSort.Name, StoreTab.All)).toEqual([validDonut]);
	});
});
