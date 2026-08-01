import { useMemo } from "react";

import { getOperationPeriodDates, presentAccountOperations, presentAccountOperationsSummary } from "./account-operations-presenter";
import type { AccountTypeFilter, OperationPeriod, OperationTypeFilter } from "./account-operations-types";
import { usePagintatedListBase } from "@/logic/hooks/use-pagintated-list-base";
import { useGetAccountOperationsSummaryQuery } from "@/services/api/bonuts-api";
import { accountsApi } from "@/services/api/extended/accounts-api";

interface IUseAccountOperationsProps {
	accountType: AccountTypeFilter;
	operationType: OperationTypeFilter;
	period: OperationPeriod;
	profileId?: number;
	search: string;
	tenant?: string;
}

export const useAccountOperations = ({ accountType, operationType, period, profileId, search, tenant }: IUseAccountOperationsProps) => {
	const dates = useMemo(() => getOperationPeriodDates(period), [period]);
	const isSkipped = !profileId || !tenant;
	const historyArgs = useMemo(
		() => ({
			accountType,
			operationType,
			page: 1,
			profileId: profileId || 0,
			search: search || undefined,
			tenant: tenant || "",
			...dates,
		}),
		[accountType, dates, operationType, profileId, search, tenant]
	);
	const {
		fetchNext,
		flatData: operations,
		hasNext,
		isError: isHistoryError,
		isFetching: isHistoryFetching,
		isLoading: isHistoryLoading,
	} = usePagintatedListBase({
		args: historyArgs,
		endpoint: accountsApi.endpoints.getAccountOperationsHistory,
		pollingInterval: 10000,
		skip: isSkipped,
		translator: (response) => presentAccountOperations(response.data),
	});
	const summaryQuery = useGetAccountOperationsSummaryQuery(
		{
			accountType: "all",
			profileId: profileId || 0,
			tenant: tenant || "",
			...dates,
		},
		{ refetchOnMountOrArgChange: true, skip: isSkipped }
	);
	const summary = useMemo(() => presentAccountOperationsSummary(summaryQuery.data?.data, operations), [operations, summaryQuery.data]);

	return {
		fetchNext,
		hasNext,
		isError: isHistoryError || summaryQuery.isError,
		isLoading: isHistoryLoading || summaryQuery.isLoading,
		isFetching: isHistoryFetching || summaryQuery.isFetching,
		operations,
		summary,
	};
};
