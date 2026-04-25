import { describe, expect, it } from "vitest";

import { formatStringDate, getLocalTimeZone, getMonthDayArray, getMonthDayOptions, getTimezones, getWeekdayOptions, secondsToDateObject, secondsToTime, timeToSecondsFromMidnight } from "../index";

import { enUS, ru } from "date-fns/locale";

describe("shared/lib/date helpers", () => {
	it("returns month day array and options", () => {
		const days = getMonthDayArray();
		const options = getMonthDayOptions();

		expect(days).toHaveLength(31);
		expect(days[0]).toBe(1);
		expect(days[30]).toBe(31);
		expect(options[0]).toEqual({ id: 1, label: 1 });
		expect(options[30]).toEqual({ id: 31, label: 31 });
	});

	it("returns weekday options from Monday to Sunday", () => {
		const options = getWeekdayOptions();

		expect(options).toHaveLength(7);
		expect(options[0]).toEqual({ id: 1, label: "monday" });
		expect(options[6]).toEqual({ id: 7, label: "sunday" });
	});

	it("returns timezone map and local timezone", () => {
		const timezones = getTimezones();
		const localTimeZone = getLocalTimeZone();

		expect(timezones.GMT).toBe("UTC");
		expect(localTimeZone.length).toBeGreaterThan(0);
	});

	it("formats date strings in different modes", () => {
		expect(formatStringDate("2024-01-05T13:45:00.000Z", true, false, enUS)).toBe("05 January");
		expect(formatStringDate("2024-01-05T13:45:00.000Z", false, false, enUS)).toBe("05.01.2024");
		expect(formatStringDate("2024-01-05T13:45:00", false, true, enUS)).toBe("05.01.2024 13:45");
		expect(formatStringDate("2024-01-05T13:45:00.000Z", false, false, enUS, true, true)).toBe("13:45");
		expect(formatStringDate("invalid-date")).toBe("");
	});

	it("formats date strings with ru locale and by default", () => {
		expect(formatStringDate("2024-01-05T13:45:00.000Z", true, false, ru)).toBe("05 января");
		expect(formatStringDate("2024-01-05T13:45:00.000Z", true)).toBe("05 января");
		expect(formatStringDate("2024-01-05T13:45:00.000Z", false, false, ru)).toBe("05.01.2024");
		expect(formatStringDate("2024-01-05T13:45:00", false, true, ru)).toBe("05.01.2024 13:45");
	});

	it("converts seconds and time-from-midnight consistently", () => {
		const dateObject = secondsToDateObject(3661);
		const isoDateTime = secondsToTime(3661);
		const parsed = new Date(isoDateTime);

		expect(dateObject.getHours()).toBe(1);
		expect(dateObject.getMinutes()).toBe(1);
		expect(dateObject.getSeconds()).toBe(1);
		expect(parsed.getHours()).toBe(1);
		expect(parsed.getMinutes()).toBe(1);
		expect(parsed.getSeconds()).toBe(1);
		expect(timeToSecondsFromMidnight(isoDateTime)).toBe(3661);
		expect(timeToSecondsFromMidnight(undefined)).toBe(0);
	});
});
