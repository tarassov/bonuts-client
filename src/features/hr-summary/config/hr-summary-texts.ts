enum hrSummaryTexts {
	ai_summary = "ai summary",
	hr_summary_intro = "ask for a summary of recognition activity for any period within the last 12 months. each reply also includes a 12-month overview",
	hr_summary_privacy_notice = "when you send a request, public feed events, comments and employee names of your team may be sent to an external ai gateway",
	hr_summary_period_hint = "period within the last 12 months",
	request_summary = "request summary",
	summary_request_for_period = "summary for {{from}} – {{to}}",
	queued_for_generation = "waiting in the queue, the summary will start shortly",
	preparing_summary = "preparing the summary, it can take a few minutes",
	preparing_summary_elapsed = "preparing the summary, {{minutes}} min so far",
	summary_stuck = "the summary seems to be stuck. request it again",
	request_again = "request again",
	summary_failed = "the summary could not be prepared",
	show_annual_overview = "show 12-month overview",
	hide_annual_overview = "hide 12-month overview",
	no_summaries_yet = "no summaries yet",
}

export default hrSummaryTexts;
