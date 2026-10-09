import { useCallback, useMemo } from "react";

import { apiProfilesAdaptor } from "services/adaptor/api-profile-adaptor";
import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";

import { useGetReportsProfilesFeedInfiniteQuery } from "../api/reports-api";

const REPORTS_PROFILE_PAGE_SIZE = 25;

export const useProfileReports = (
	args: {
		reportType?: "show_balance" | "show_score" | "show_sent";
		searchText?: string;
		dateFrom?: string;
		dateTo?: string;
	} = {},
	skip?: boolean
) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { dateFrom, dateTo, reportType, searchText } = args;
	const queryArg = useMemo(
		() => ({
			tenant: authTenant,
			reportType,
			dateFrom,
			dateTo,
			searchText,
			perPage: REPORTS_PROFILE_PAGE_SIZE,
		}),
		[authTenant, dateFrom, dateTo, reportType, searchText]
	);

	const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isSuccess, refetch } = useGetReportsProfilesFeedInfiniteQuery(queryArg, {
		refetchOnMountOrArgChange: true,
		skip: skip || !authTenant,
	});

	const objects = useMemo(() => {
		if (!data?.pages?.length) return [];

		return data.pages.flatMap((page) => apiProfilesAdaptor(page));
	}, [data?.pages]);

	const fetchNext = useCallback(() => {
		if (!hasNextPage || isFetching) return;
		fetchNextPage().catch(() => undefined);
	}, [fetchNextPage, hasNextPage, isFetching]);

	return {
		objects,
		isLoading,
		isSuccess,
		refetch,
		hasNext: Boolean(hasNextPage),
		fetchNext,
		isFetching,
	};
};
