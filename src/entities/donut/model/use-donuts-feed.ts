import { useCallback, useMemo } from "react";

import { authTenantSelector } from "@/shared/model/auth";

import { donutsApi } from "../api/donuts-api";

import { USE_POLLING_INTERVAL } from "@/app/config";
import { apiDonutsToDonuts } from "@/services/adaptor/api-donuts-to-donuts";
import { useAppSelector } from "@/services/redux/store/store";

const pollingInterval = USE_POLLING_INTERVAL ? 1000 : 0;

export const useDonutsFeed = (isAllDonutsIncluded = false) => {
	const authTenant = useAppSelector(authTenantSelector);
	const queryArg = useMemo(
		() => ({
			tenant: authTenant || undefined,
			all: isAllDonutsIncluded ? "true" : "false",
		}),
		[authTenant, isAllDonutsIncluded]
	);
	const { data, isFetching, isLoading, fetchNextPage, hasNextPage, refetch } = donutsApi.useGetDonutsFeedInfiniteQuery(queryArg, {
		pollingInterval,
		refetchOnMountOrArgChange: true,
		skip: !authTenant,
	});
	const pages = useMemo(() => data?.pages.map(apiDonutsToDonuts) ?? [], [data?.pages]);
	const donuts = useMemo(() => pages.flat(), [pages]);

	const fetchNext = useCallback(() => {
		if (!hasNextPage || isFetching) return;

		fetchNextPage().catch(() => undefined);
	}, [fetchNextPage, hasNextPage, isFetching]);

	return {
		donuts,
		fetchNext,
		hasNext: Boolean(hasNextPage),
		isFetching,
		isLoading,
		refetch,
	};
};
