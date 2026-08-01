import { useMemo } from "react";
import { DonutSmallOutlined, ListAltOutlined, PaidOutlined } from "@mui/icons-material";

import { SearchString } from "@/shared/ui/search-string";
import { BntSection } from "@/shared/ui/section";
import { BntSegmentedTabs } from "@/shared/ui/tab";

import type { IAccountOperationsSummary } from "../model/account-operations-types";
import { AccountTypeFilter, OperationTypeFilter } from "../model/account-operations-types";

import { AccountOperationFilterButton } from "./account-operation-filter-button";
import styles from "./account-operations-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_a, texts_c, texts_d, texts_o, texts_p, texts_r, texts_s } from "@/services/localization/texts";

interface IAccountOperationsToolbarProps {
	accountType: AccountTypeFilter;
	isExpanded: boolean;
	onAccountTypeChange: (value: AccountTypeFilter) => void;
	onOperationTypeChange: (value: OperationTypeFilter) => void;
	onSearchChange: (value: string) => void;
	operationType: OperationTypeFilter;
	search: string;
	summary: IAccountOperationsSummary;
}

export function AccountOperationsToolbar(props: IAccountOperationsToolbarProps) {
	const { accountType, isExpanded, onAccountTypeChange, onOperationTypeChange, onSearchChange, operationType, search, summary } = props;
	const { t } = useBntTranslate();
	const accountTabs = useMemo(
		() => [
			{ count: summary.operationsCount, icon: <ListAltOutlined />, label: t(texts_a.all), testId: "account-type-all", value: AccountTypeFilter.all },
			{ count: summary.coinOperationsCount, icon: <PaidOutlined />, label: t(texts_c.coins, { capitalize: true }), testId: "account-type-coin", value: AccountTypeFilter.coin },
			{ count: summary.donutOperationsCount, icon: <DonutSmallOutlined />, label: t(texts_d.donuts, { capitalize: true }), testId: "account-type-donut", value: AccountTypeFilter.donut },
		],
		[summary, t]
	);
	const operationFilters = [
		{ label: t(texts_a.all_types, { capitalize: true }), value: OperationTypeFilter.all },
		{ label: t(texts_p.purchases, { capitalize: true }), value: OperationTypeFilter.purchase },
		{ label: t(texts_r.refunds, { capitalize: true }), value: OperationTypeFilter.refund },
		{ label: t(texts_r.recognition, { capitalize: true }), value: OperationTypeFilter.recognition },
	];

	return (
		<BntSection className={styles.toolbar} data-expanded={isExpanded}>
			<BntSegmentedTabs ariaLabel={t(texts_a.account_type)} items={accountTabs} onChange={onAccountTypeChange} value={accountType} />
			<div className={styles.toolbarFilters}>
				<SearchString
					debounceDelay={350}
					mobilePlaceholder={t(texts_s.search)}
					name="account-operations-search"
					placeholder={t(texts_s.search_operations)}
					setSearch={onSearchChange}
					value={search}
					variant="surface"
				/>
				<div className={styles.operationFilters} aria-label={t(texts_o.operation_types)} role="group">
					{operationFilters.map((filter) => (
						<AccountOperationFilterButton
							data-testid={`operation-filter-${filter.value}`}
							isSelected={filter.value === operationType}
							key={filter.value}
							onClick={() => onOperationTypeChange(filter.value)}
						>
							{filter.label}
						</AccountOperationFilterButton>
					))}
				</div>
			</div>
		</BntSection>
	);
}
