import { useMemo } from "react";

import { getOperationPeriodDates, presentAccountOperations, presentAccountOperationsSummary } from "./account-operations-presenter";
import type { AccountTypeFilter, OperationPeriod, OperationTypeFilter } from "./account-operations-types";
import { useGetAccountOperationsHistoryQuery, useGetAccountOperationsSummaryQuery } from "@/services/api/bonuts-api";

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
	const historyQuery = useGetAccountOperationsHistoryQuery(
		{
			accountType,
			operationType,
			page: 1,
			profileId: profileId || 0,
			search: search || undefined,
			tenant: tenant || "",
			...dates,
		},
		{ skip: isSkipped }
	);
	const summaryQuery = useGetAccountOperationsSummaryQuery(
		{
			accountType: "all",
			profileId: profileId || 0,
			tenant: tenant || "",
			...dates,
		},
		{ skip: isSkipped }
	);
	const operations = useMemo(() => presentAccountOperations(historyQuery.data?.data), [historyQuery.data]);
	const summary = useMemo(() => presentAccountOperationsSummary(summaryQuery.data?.data, operations), [operations, summaryQuery.data]);

	return {
		isError: historyQuery.isError || summaryQuery.isError,
		isLoading: historyQuery.isLoading || summaryQuery.isLoading,
		isFetching: historyQuery.isFetching || summaryQuery.isFetching,
		operations,
		summary,
	};
};
