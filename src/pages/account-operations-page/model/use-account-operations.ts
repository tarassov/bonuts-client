import { useCallback, useMemo } from "react";

import { getOperationPeriodDates, presentAccountOperations, presentAccountOperationsSummary } from "./account-operations-presenter";
import type { AccountTypeFilter, OperationPeriod, OperationTypeFilter } from "./account-operations-types";
import { USE_POLLING_INTERVAL } from "@/app/config";
import { useGetAccountOperationsSummaryQuery } from "@/services/api/bonuts-api";
import { useGetAccountOperationsHistoryFeedInfiniteQuery } from "@/services/api/extended/accounts-api";

interface IUseAccountOperationsProps {
	accountType: AccountTypeFilter;
	operationType: OperationTypeFilter;
	period: OperationPeriod;
	profileId?: number;
	search: string;
	tenant?: string;
}

const pollingInterval = USE_POLLING_INTERVAL ? 10000 : 0;

export const useAccountOperations = ({ accountType, operationType, period, profileId, search, tenant }: IUseAccountOperationsProps) => {
	const dates = useMemo(() => getOperationPeriodDates(period), [period]);
	const isSkipped = !profileId || !tenant;
	const historyArgs = useMemo(
		() => ({
			accountType,
			operationType,
			profileId: profileId || 0,
			search: search || undefined,
			tenant: tenant || "",
			...dates,
		}),
		[accountType, dates, operationType, profileId, search, tenant]
	);
	const {
		data: historyData,
		fetchNextPage,
		hasNextPage,
		isError: isHistoryError,
		isFetching: isHistoryFetching,
		isLoading: isHistoryLoading,
	} = useGetAccountOperationsHistoryFeedInfiniteQuery(historyArgs, { pollingInterval, refetchOnMountOrArgChange: true, skip: isSkipped });
	const operations = useMemo(() => (historyData?.pages ?? []).flatMap((page) => presentAccountOperations(page.data)), [historyData?.pages]);

	const fetchNext = useCallback(() => {
		if (!hasNextPage || isHistoryFetching) return;

		fetchNextPage().catch(() => undefined);
	}, [fetchNextPage, hasNextPage, isHistoryFetching]);

	const summaryQuery = useGetAccountOperationsSummaryQuery(
		{
			accountType: "all",
			profileId: profileId || 0,
			tenant: tenant || "",
			...dates,
		},
		{ refetchOnMountOrArgChange: true, skip: isSkipped }
	);
	const summary = useMemo(() => presentAccountOperationsSummary(summaryQuery.data?.data), [summaryQuery.data]);

	return {
		fetchNext,
		hasNext: Boolean(hasNextPage),
		isError: isHistoryError || summaryQuery.isError,
		isLoading: isHistoryLoading || summaryQuery.isLoading,
		isFetching: isHistoryFetching || summaryQuery.isFetching,
		operations,
		summary,
	};
};
