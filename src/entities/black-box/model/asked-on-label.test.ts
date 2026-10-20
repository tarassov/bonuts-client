import { describe, expect, it } from "vitest";

import blackBoxTexts from "../config/black-box-texts";

import { getAskedOnLabel } from "./asked-on-label";

const TODAY = new Date(2026, 9, 21, 15, 30);

describe("getAskedOnLabel", () => {
	it("names today and yesterday", () => {
		expect(getAskedOnLabel("2026-10-21", TODAY)).toEqual({ key: blackBoxTexts.asked_today });
		expect(getAskedOnLabel("2026-10-20", TODAY)).toEqual({ key: blackBoxTexts.asked_yesterday });
	});

	it("counts the days within a week", () => {
		expect(getAskedOnLabel("2026-10-16", TODAY)).toEqual({ key: blackBoxTexts.asked_days_ago, count: 5 });
	});

	it("falls back to the date for older questions", () => {
		expect(getAskedOnLabel("2026-10-01", TODAY)).toEqual({ date: "2026-10-01" });
	});
});
