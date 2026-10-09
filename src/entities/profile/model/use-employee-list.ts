import { useCallback, useEffect, useMemo, useRef } from "react";

import { authTenantSelector } from "@/shared/model/auth";

import { useGetProfilesFeedInfiniteQuery } from "../api/profiles-api";

import { EmployeeListSort } from "./employee-list-sort";
import { useAppSelector } from "@/services/redux/store/store";
import type { TProfile } from "@/types/model";

const EMPLOYEES_PER_PAGE = 24;

interface IUseEmployeeListArgs {
	isAutoFetchAll?: boolean;
	searchText?: string;
	sort?: EmployeeListSort;
}

export const useEmployeeList = ({ isAutoFetchAll = true, searchText, sort = EmployeeListSort.Alphabet }: IUseEmployeeListArgs = {}) => {
	const tenant = useAppSelector(authTenantSelector);
	const queryArg = useMemo(() => ({ tenant: tenant || undefined, searchText, sort, perPage: EMPLOYEES_PER_PAGE }), [searchText, sort, tenant]);
	const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isSuccess, refetch } = useGetProfilesFeedInfiniteQuery(queryArg, {
		refetchOnMountOrArgChange: true,
		skip: !tenant,
	});
	const objects = useMemo<Array<TProfile>>(() => data?.pages.flatMap((page) => page.data ?? []) ?? [], [data?.pages]);
	const fetchStateRef = useRef({ fetchNextPage, hasNextPage, isFetching });
	fetchStateRef.current = { fetchNextPage, hasNextPage, isFetching };

	const fetchNext = useCallback(() => {
		const { fetchNextPage: fetchPage, hasNextPage: hasNext, isFetching: isPageFetching } = fetchStateRef.current;

		if (!hasNext || isPageFetching) return;

		fetchPage().catch(() => undefined);
	}, []);

	useEffect(() => {
		if (isAutoFetchAll && data?.pages.length) fetchNext();
	}, [data?.pages.length, fetchNext, isAutoFetchAll]);

	return {
		error,
		fetchNext,
		hasNext: Boolean(hasNextPage),
		isFetching,
		isLoading: isLoading || (isAutoFetchAll && Boolean(hasNextPage)),
		isSuccess,
		loadedPageCount: data?.pages.length ?? 0,
		onlineCount: data?.pages[0]?.meta?.online_count || 0,
		objects,
		refetch,
		teamCount: data?.pages[0]?.meta?.team_count || 0,
	};
};
