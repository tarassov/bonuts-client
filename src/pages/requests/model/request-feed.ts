import type { GetRequestsApiArg } from "@/services/api/bonuts-api";
import { texts_a, texts_c, texts_i, texts_m, texts_p, texts_r, texts_t } from "@/services/localization/texts";

export type TRequestsTab = "incoming" | "active" | "closed";
export type TRequestSort = "newest" | "oldest";
export type TRequestsView = "team" | "my";

export const requestsPageSize = 20;

export const requestsTabQueryMap: Record<TRequestsTab, Pick<GetRequestsApiArg, "active" | "archive" | "incoming" | "my">> = {
	incoming: {
		incoming: true,
	},
	active: {
		active: true,
	},
	closed: {
		archive: true,
	},
};

export const requestsTabs = [
	{
		label: texts_i.incoming,
		value: "incoming",
	},
	{
		label: texts_a.active_request,
		value: "active",
	},
	{
		label: texts_c.closed_requests,
		value: "closed",
	},
] as const satisfies ReadonlyArray<{ label: string; value: TRequestsTab }>;

export const myRequestsTabs = [
	{
		label: texts_a.active_request,
		value: "active",
	},
	{
		label: texts_c.closed_requests,
		value: "closed",
	},
] as const satisfies ReadonlyArray<{ label: string; value: TRequestsTab }>;

export const myRequestsTabQueryMap: Record<Exclude<TRequestsTab, "incoming">, Pick<GetRequestsApiArg, "active" | "archive" | "incoming" | "my">> = {
	active: {
		active: true,
		incoming: true,
		my: true,
	},
	closed: {
		archive: true,
		my: true,
	},
};

export const requestsViewConfig = {
	my: {
		subtitle: texts_t.track_your_requests_in_one_feed,
		tabs: myRequestsTabs,
		title: texts_m.my_requests,
	},
	team: {
		subtitle: texts_p.process_team_join_requests,
		tabs: requestsTabs,
		title: texts_r.requests,
	},
} as const;
