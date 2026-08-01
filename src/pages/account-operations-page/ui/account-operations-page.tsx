import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useAppNavigate } from "@/shared/lib/navigation";

import { useProfile } from "@/entities/profile";

import { AccountTypeFilter, OperationPeriod, OperationTypeFilter } from "../model/account-operations-types";
import { useAccountOperations } from "../model/use-account-operations";

import { AccountOperationsView } from "./account-operations-view";

const getEnumValue = <T extends string>(value: string | null, values: T[], fallback: T): T => (value && values.includes(value as T) ? (value as T) : fallback);

export function AccountOperationsPage() {
	const { id } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const { goBack } = useAppNavigate();
	const { authTenant, profile } = useProfile();
	const profileId = Number(id) || profile?.id;
	const [search, setSearch] = useState("");
	const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
	const accountType = getEnumValue(searchParams.get("accountType"), Object.values(AccountTypeFilter), AccountTypeFilter.all);
	const operationType = getEnumValue(searchParams.get("operationType"), Object.values(OperationTypeFilter), OperationTypeFilter.all);
	const period = getEnumValue(searchParams.get("period"), Object.values(OperationPeriod), OperationPeriod.allTime);
	const { fetchNext, hasNext, isError, isFetching, isLoading, operations, summary } = useAccountOperations({ accountType, operationType, period, profileId, search, tenant: authTenant });

	const setFilter = (name: string, value: string) => {
		const nextParams = new URLSearchParams(searchParams);

		if (value === "all" || value === OperationPeriod.allTime) nextParams.delete(name);
		else nextParams.set(name, value);
		setSearchParams(nextParams, { replace: true });
	};

	return (
		<AccountOperationsView
			accountType={accountType}
			hasNext={hasNext}
			isError={isError}
			isFetching={isFetching}
			isFiltersExpanded={isFiltersExpanded}
			isLoading={isLoading}
			onAccountTypeChange={(value) => setFilter("accountType", value)}
			onBack={goBack}
			onFiltersToggle={() => setIsFiltersExpanded((isExpanded) => !isExpanded)}
			onOperationTypeChange={(value) => setFilter("operationType", value)}
			onLoadMore={fetchNext}
			onPeriodChange={(value) => setFilter("period", value)}
			onSearchChange={setSearch}
			operationType={operationType}
			operations={operations}
			period={period}
			search={search}
			summary={summary}
		/>
	);
}
