import { useCallback, useMemo } from "react";

import { authTenantSelector } from "@/shared/model/auth";

import { eventsApi } from "../api/events-api";

import { USE_POLLING_INTERVAL } from "@/app/config";
import { apiAdaptor } from "@/services/adaptor/api-adaptor";
import { useAppSelector } from "@/services/redux/store/store";

export const useEventListLogic = ({ showMine = false, searchText = undefined }: { showMine: boolean; searchText?: string }) => {
	const authTenant = useAppSelector(authTenantSelector);
	const queryArg = useMemo(
		() => ({
			tenant: authTenant,
			showMine: showMine ? "true" : "false",
			searchText,
		}),
		[authTenant, searchText, showMine]
	);

	const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = eventsApi.useGetEventsFeedInfiniteQuery(queryArg, {
		skip: !authTenant,
		pollingInterval: USE_POLLING_INTERVAL ? 10000 : 0,
		refetchOnMountOrArgChange: true,
	});

	const pages = useMemo(() => {
		if (!data?.pages?.length) return [];

		return data.pages.map((page) => apiAdaptor.toPosts(page));
	}, [data?.pages]);

	const fetchNext = useCallback(() => {
		if (!hasNextPage || isFetching) return;
		fetchNextPage().catch(() => undefined);
	}, [fetchNextPage, hasNextPage, isFetching]);

	const applyUpdates = useCallback(() => {
		return undefined;
	}, []);

	return {
		hasNext: Boolean(hasNextPage),
		pages,
		isLoading,
		fetchNext,
		hasNew: false,
		applyUpdates,
		flatData: pages.flat(),
		isFetching,
	};
};
