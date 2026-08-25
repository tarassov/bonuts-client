import { useCallback, useEffect, useMemo, useRef } from "react";

import { authTenantSelector } from "@/shared/model/auth";

import { donutsApi } from "../api/donuts-api";

import { USE_POLLING_INTERVAL } from "@/app/config";
import { apiDonutsToDonuts } from "@/services/adaptor/api-donuts-to-donuts";
import { useAppSelector } from "@/services/redux/store/store";

const pollingInterval = USE_POLLING_INTERVAL ? 1000 : 0;

interface IUseDonutsFeedOptions {
	isAllDonutsIncluded?: boolean;
	isAutoFetchAll?: boolean;
}

export const useDonutsFeed = ({ isAllDonutsIncluded = false, isAutoFetchAll = false }: IUseDonutsFeedOptions = {}) => {
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
	const fetchStateRef = useRef({ fetchNextPage, hasNextPage, isFetching });
	fetchStateRef.current = { fetchNextPage, hasNextPage, isFetching };

	const fetchNext = useCallback(() => {
		const { fetchNextPage: fetchPage, hasNextPage: hasNext, isFetching: isPageFetching } = fetchStateRef.current;
		if (!hasNext || isPageFetching) return;

		fetchPage().catch(() => undefined);
	}, []);

	useEffect(() => {
		if (isAutoFetchAll && pages.length) fetchNext();
	}, [fetchNext, isAutoFetchAll, pages.length]);

	const isFeedLoading = isLoading || (isAutoFetchAll && Boolean(hasNextPage));

	return {
		donuts,
		fetchNext,
		hasNext: Boolean(hasNextPage),
		isFetching,
		isLoading: isFeedLoading,
		loadedPageCount: pages.length,
		refetch,
	};
};
