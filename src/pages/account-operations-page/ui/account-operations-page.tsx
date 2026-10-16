import { useState } from "react";
import { useParams } from "react-router-dom";

import { useAppNavigate, useAppSearchParams } from "@/shared/lib/navigation";

import { useProfile } from "@/entities/profile";

import { AccountOperationsSearchParam, AccountTypeFilter, OperationPeriod, OperationTypeFilter } from "../model/account-operations-types";
import { useAccountOperations } from "../model/use-account-operations";

import { AccountOperationsView } from "./account-operations-view";

const filterDefaults: Record<AccountOperationsSearchParam, string> = {
	[AccountOperationsSearchParam.accountType]: AccountTypeFilter.all,
	[AccountOperationsSearchParam.operationType]: OperationTypeFilter.all,
	[AccountOperationsSearchParam.period]: OperationPeriod.allTime,
};

/** Shorter queries match almost everything, so they are requested as an empty search. */
const minSearchLength = 3;

export function AccountOperationsPage() {
	const { id } = useParams();
	const { getEnumParam, setParam } = useAppSearchParams();
	const { goBack } = useAppNavigate();
	const { authTenant, profile } = useProfile();
	const profileId = Number(id) || profile?.id;
	const [search, setSearch] = useState("");
	const [isPeriodFiltersExpanded, setIsPeriodFiltersExpanded] = useState(false);
	const [isOperationFiltersExpanded, setIsOperationFiltersExpanded] = useState(false);
	const accountType = getEnumParam({ fallback: AccountTypeFilter.all, name: AccountOperationsSearchParam.accountType, values: Object.values(AccountTypeFilter) });
	const operationType = getEnumParam({ fallback: OperationTypeFilter.all, name: AccountOperationsSearchParam.operationType, values: Object.values(OperationTypeFilter) });
	const period = getEnumParam({ fallback: OperationPeriod.allTime, name: AccountOperationsSearchParam.period, values: Object.values(OperationPeriod) });
	const trimmedSearch = search.trim();
	const searchQuery = trimmedSearch.length >= minSearchLength ? trimmedSearch : "";
	const { fetchNext, hasNext, isError, isFetching, isLoading, operations, summary } = useAccountOperations({
		accountType,
		operationType,
		period,
		profileId,
		search: searchQuery,
		tenant: authTenant,
	});

	// Default filter values are not kept in the url, so a clean page shares a clean link.
	const setFilter = (name: AccountOperationsSearchParam, value: string) => {
		setParam({ name, value: value === filterDefaults[name] ? null : value });
	};

	return (
		<AccountOperationsView
			accountType={accountType}
			hasNext={hasNext}
			isError={isError}
			isFetching={isFetching}
			isOperationFiltersExpanded={isOperationFiltersExpanded}
			isPeriodFiltersExpanded={isPeriodFiltersExpanded}
			isLoading={isLoading}
			onAccountTypeChange={(value) => setFilter(AccountOperationsSearchParam.accountType, value)}
			onBack={goBack}
			onOperationFiltersToggle={() => setIsOperationFiltersExpanded((isExpanded) => !isExpanded)}
			onPeriodFiltersToggle={() => setIsPeriodFiltersExpanded((isExpanded) => !isExpanded)}
			onOperationTypeChange={(value) => setFilter(AccountOperationsSearchParam.operationType, value)}
			onLoadMore={fetchNext}
			onPeriodChange={(value) => setFilter(AccountOperationsSearchParam.period, value)}
			onSearchChange={setSearch}
			operationType={operationType}
			operations={operations}
			period={period}
			search={search}
			summary={summary}
		/>
	);
}
