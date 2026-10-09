import { addDays, differenceInMinutes, format, parseISO, startOfDay, subMonths } from "date-fns";

import { HrSummaryPhase, HrSummaryStatus, type THrSummary, type THrSummaryPeriod } from "./hr-summary.types";

const API_DATE_FORMAT = "yyyy-MM-dd";
const SUMMARY_HISTORY_MONTHS = 12;

/** Matches HrSummary::STALE_AFTER on the backend: a pending summary older than this is treated as lost. */
export const STALE_AFTER_MINUTES = 15;

export const toApiDate = (date: Date): string => format(date, API_DATE_FORMAT);

/** The earliest day the backend accepts: a summary covers at most the last 12 months. */
export const getEarliestPeriodStart = (today: Date = new Date()): Date => addDays(subMonths(startOfDay(today), SUMMARY_HISTORY_MONTHS), 1);

/** Default request: the last month, matching the backend default when no dates are sent. */
export const getDefaultPeriod = (today: Date = new Date()): THrSummaryPeriod => {
	const dateTo = startOfDay(today);

	return { dateFrom: addDays(subMonths(dateTo, 1), 1), dateTo };
};

export const isPeriodValid = ({ dateFrom, dateTo }: THrSummaryPeriod, today: Date = new Date()): boolean => {
	const earliest = getEarliestPeriodStart(today);
	const latest = startOfDay(today);

	return dateFrom >= earliest && dateFrom <= dateTo && dateTo <= latest;
};

export const getSummaryPeriod = (summary: THrSummary): THrSummaryPeriod => ({
	dateFrom: parseISO(summary.period_from),
	dateTo: parseISO(summary.period_to),
});

export const getElapsedMinutes = (summary: THrSummary, now: Date): number => Math.max(0, differenceInMinutes(now, parseISO(summary.created_at)));

export const getSummaryPhase = (summary: THrSummary, now: Date): HrSummaryPhase => {
	if (summary.status === HrSummaryStatus.Ready) return HrSummaryPhase.Ready;
	if (summary.status === HrSummaryStatus.Failed) return HrSummaryPhase.Failed;
	if (getElapsedMinutes(summary, now) >= STALE_AFTER_MINUTES) return HrSummaryPhase.Stale;

	return summary.started_at ? HrSummaryPhase.Generating : HrSummaryPhase.Queued;
};

/** Only summaries still expected to finish keep the thread polling and the composer locked. */
export const hasActiveSummary = (summaries: THrSummary[], now: Date): boolean =>
	summaries.some((summary) => {
		const phase = getSummaryPhase(summary, now);

		return phase === HrSummaryPhase.Queued || phase === HrSummaryPhase.Generating;
	});

/** The API returns newest first; a chat thread reads oldest first. */
export const sortThreadChronologically = (summaries: THrSummary[]): THrSummary[] => [...summaries].sort((left, right) => left.id - right.id);
