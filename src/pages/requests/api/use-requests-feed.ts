import { useCallback, useMemo } from "react";

import { myRequestsFeedTabQueryMap, myRequestsTabQueryMap, RequestsTab, RequestsView, requestsPageSize, requestsTabQueryMap } from "../model/request-feed";

import { USE_POLLING_INTERVAL } from "@/app/config";
import { useCurrentTenant } from "@/logic/hooks/tenant/use-current-tenant";
import { apiAdaptor } from "@/services/adaptor/api-adaptor";
import { useGetRequestsFeedInfiniteQuery, useGetRequestsMetricsQuery } from "@/services/api/extended/requests-api";

type TUseRequestsFeedArgs = {
	search?: string;
	tab: RequestsTab;
	view: RequestsView;
};

const pollingInterval = USE_POLLING_INTERVAL ? 10000 : 0;

export const useRequestsFeed = ({ search, tab, view }: TUseRequestsFeedArgs) => {
	const tenant = useCurrentTenant();
	const resolvedSearch = search || undefined;
	const isMyView = view === RequestsView.My;
	const tabQueryMap = isMyView ? myRequestsFeedTabQueryMap : requestsTabQueryMap;

	const queryArg = useMemo(
		() => ({
			tenant: tenant || "",
			perPage: requestsPageSize,
			search: resolvedSearch,
			...tabQueryMap[tab],
		}),
		[resolvedSearch, tab, tabQueryMap, tenant]
	);

	const closedCountQueryArg = useMemo(
		() => ({
			tenant: tenant || "",
			perPage: 1,
			search: resolvedSearch,
			...(isMyView ? myRequestsTabQueryMap[RequestsTab.Closed] : requestsTabQueryMap[RequestsTab.Closed]),
		}),
		[isMyView, resolvedSearch, tenant]
	);

	const { data, isFetching, isLoading, fetchNextPage, hasNextPage, refetch } = useGetRequestsFeedInfiniteQuery(queryArg, {
		skip: !tenant,
		pollingInterval,
		refetchOnMountOrArgChange: true,
	});

	const { data: metricsData } = useGetRequestsMetricsQuery(
		{
			tenant: tenant || "",
			my: isMyView,
			search: resolvedSearch,
		},
		{
			skip: !tenant,
			pollingInterval,
			refetchOnMountOrArgChange: true,
		}
	);

	const { data: closedCountData } = useGetRequestsFeedInfiniteQuery(closedCountQueryArg, {
		skip: !tenant,
		pollingInterval,
		refetchOnMountOrArgChange: true,
	});

	const pages = useMemo(() => {
		if (!data?.pages?.length) return [];

		return data.pages.map((page) => apiAdaptor.toRequests(page));
	}, [data?.pages]);

	const requests = useMemo(() => pages.flat(), [pages]);

	const fetchNext = useCallback(() => {
		if (!hasNextPage || isFetching) return;

		fetchNextPage().catch(() => undefined);
	}, [fetchNextPage, hasNextPage, isFetching]);

	return {
		fetchNext,
		hasNext: Boolean(hasNextPage),
		isFetching,
		isLoading,
		refetch,
		requests,
		tabCounts: {
			incoming: metricsData?.data?.incoming,
			active: isMyView ? (metricsData?.data?.incoming || 0) + (metricsData?.data?.active || 0) : metricsData?.data?.active,
			closed: closedCountData?.pages?.[0]?.paginator?.total,
		},
	};
};
