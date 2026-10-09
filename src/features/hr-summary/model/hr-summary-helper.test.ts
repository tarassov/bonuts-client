import { describe, expect, it } from "vitest";

import { HrSummaryPhase, HrSummaryStatus, type THrSummary } from "./hr-summary.types";
import { getDefaultPeriod, getEarliestPeriodStart, getElapsedMinutes, getSummaryPhase, hasActiveSummary, isPeriodValid, sortThreadChronologically, toApiDate } from "./hr-summary-helper";

const TODAY = new Date(2026, 9, 10);
const NOW = new Date("2026-10-10T10:20:00Z");

const buildSummary = (overrides: Partial<THrSummary>): THrSummary => ({
	id: 1,
	status: HrSummaryStatus.Ready,
	annual_from: "2025-10-11",
	annual_to: "2026-10-10",
	period_from: "2026-09-11",
	period_to: "2026-10-10",
	annual_summary: "year",
	period_summary: "month",
	error_message: null,
	started_at: null,
	created_at: "2026-10-10T10:00:00Z",
	...overrides,
});

describe("hr-summary-helper", () => {
	it("defaults to the last month ending today", () => {
		const period = getDefaultPeriod(TODAY);

		expect(toApiDate(period.dateFrom)).toBe("2026-09-11");
		expect(toApiDate(period.dateTo)).toBe("2026-10-10");
	});

	it("limits the period to the last 12 months", () => {
		expect(toApiDate(getEarliestPeriodStart(TODAY))).toBe("2025-10-11");
		expect(isPeriodValid({ dateFrom: new Date(2025, 9, 11), dateTo: TODAY }, TODAY)).toBe(true);
		expect(isPeriodValid({ dateFrom: new Date(2025, 9, 10), dateTo: TODAY }, TODAY)).toBe(false);
		expect(isPeriodValid({ dateFrom: TODAY, dateTo: new Date(2026, 9, 11) }, TODAY)).toBe(false);
		expect(isPeriodValid({ dateFrom: new Date(2026, 9, 5), dateTo: new Date(2026, 9, 1) }, TODAY)).toBe(false);
	});

	it("tells a queued summary from one being generated", () => {
		const queued = buildSummary({ status: HrSummaryStatus.Pending, created_at: "2026-10-10T10:15:00Z" });
		const generating = buildSummary({ status: HrSummaryStatus.Pending, created_at: "2026-10-10T10:15:00Z", started_at: "2026-10-10T10:16:00Z" });

		expect(getSummaryPhase(queued, NOW)).toBe(HrSummaryPhase.Queued);
		expect(getSummaryPhase(generating, NOW)).toBe(HrSummaryPhase.Generating);
		expect(getElapsedMinutes(queued, NOW)).toBe(5);
	});

	it("treats a pending summary older than 15 minutes as stale", () => {
		const stale = buildSummary({ status: HrSummaryStatus.Pending, created_at: "2026-10-10T10:00:00Z", started_at: "2026-10-10T10:01:00Z" });
		const almost = buildSummary({ status: HrSummaryStatus.Pending, created_at: "2026-10-10T10:05:30Z" });

		expect(getSummaryPhase(stale, NOW)).toBe(HrSummaryPhase.Stale);
		expect(getSummaryPhase(almost, NOW)).toBe(HrSummaryPhase.Queued);
		expect(getSummaryPhase(buildSummary({ status: HrSummaryStatus.Failed, created_at: "2026-10-10T09:00:00Z" }), NOW)).toBe(HrSummaryPhase.Failed);
	});

	it("keeps polling only while a summary can still finish", () => {
		const stale = buildSummary({ status: HrSummaryStatus.Pending, created_at: "2026-10-10T09:00:00Z" });
		const fresh = buildSummary({ status: HrSummaryStatus.Pending, created_at: "2026-10-10T10:18:00Z" });

		expect(hasActiveSummary([stale], NOW)).toBe(false);
		expect(hasActiveSummary([stale, fresh], NOW)).toBe(true);
		expect(hasActiveSummary([buildSummary({ status: HrSummaryStatus.Failed })], NOW)).toBe(false);
	});

	it("orders the thread oldest first", () => {
		const thread = sortThreadChronologically([buildSummary({ id: 3 }), buildSummary({ id: 1 }), buildSummary({ id: 2 })]);

		expect(thread.map((summary) => summary.id)).toEqual([1, 2, 3]);
	});
});
