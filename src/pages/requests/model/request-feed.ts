import type { GetRequestsApiArg } from "@/services/api/bonuts-api";
import { texts_a, texts_c, texts_i, texts_m, texts_p, texts_r, texts_t } from "@/services/localization/texts";

export enum RequestsTab {
	Incoming = "incoming",
	Active = "active",
	Closed = "closed",
}

export enum RequestSort {
	Newest = "newest",
	Oldest = "oldest",
}

export enum RequestsView {
	Team = "team",
	My = "my",
}

export const requestsPageSize = 20;

type TRequestTabQuery = Pick<GetRequestsApiArg, "active" | "archive" | "incoming" | "my">;

export const requestsTabQueryMap: Record<RequestsTab, TRequestTabQuery> = {
	[RequestsTab.Incoming]: {
		incoming: true,
	},
	[RequestsTab.Active]: {
		active: true,
	},
	[RequestsTab.Closed]: {
		archive: true,
	},
};

export const requestsTabs = [
	{
		label: texts_i.incoming,
		value: RequestsTab.Incoming,
	},
	{
		label: texts_a.active_request,
		value: RequestsTab.Active,
	},
	{
		label: texts_c.closed_requests,
		value: RequestsTab.Closed,
	},
] as const satisfies ReadonlyArray<{ label: string; value: RequestsTab }>;

export const myRequestsTabs = [
	{
		label: texts_a.active_request,
		value: RequestsTab.Active,
	},
	{
		label: texts_c.closed_requests,
		value: RequestsTab.Closed,
	},
] as const satisfies ReadonlyArray<{ label: string; value: RequestsTab }>;

export const myRequestsTabQueryMap: Record<RequestsTab.Active | RequestsTab.Closed, TRequestTabQuery> = {
	[RequestsTab.Active]: {
		active: true,
		incoming: true,
		my: true,
	},
	[RequestsTab.Closed]: {
		archive: true,
		my: true,
	},
};

export const myRequestsFeedTabQueryMap: Record<RequestsTab, TRequestTabQuery> = {
	[RequestsTab.Incoming]: requestsTabQueryMap[RequestsTab.Incoming],
	...myRequestsTabQueryMap,
};

export const requestsViewConfig = {
	[RequestsView.My]: {
		subtitle: texts_t.track_your_requests_in_one_feed,
		tabs: myRequestsTabs,
		title: texts_m.my_requests,
	},
	[RequestsView.Team]: {
		subtitle: texts_p.process_team_join_requests,
		tabs: requestsTabs,
		title: texts_r.requests,
	},
} as const;
