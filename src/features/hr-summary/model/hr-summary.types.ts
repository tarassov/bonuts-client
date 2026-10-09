export enum HrSummaryStatus {
	Pending = "pending",
	Ready = "ready",
	Failed = "failed",
}

export type THrSummary = {
	id: number;
	status: HrSummaryStatus;
	annual_from: string;
	annual_to: string;
	period_from: string;
	period_to: string;
	annual_summary: string | null;
	period_summary: string | null;
	error_message: string | null;
	started_at: string | null;
	created_at: string;
};

/** What the admin sees for one summary; derived from the API status plus elapsed time. */
export enum HrSummaryPhase {
	Queued = "queued",
	Generating = "generating",
	Stale = "stale",
	Ready = "ready",
	Failed = "failed",
}

export type THrSummaryPeriod = {
	dateFrom: Date;
	dateTo: Date;
};
