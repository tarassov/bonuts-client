import { useTranslation } from "react-i18next";
import { ArrowBackRounded, FilterListRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { BntSectionHeader } from "@/shared/ui/section";
import { BntTypography } from "@/shared/ui/typography";

import type { IAccountOperation, IAccountOperationsSummary } from "../model/account-operations-types";
import { AccountTypeFilter, OperationPeriod, OperationTypeFilter } from "../model/account-operations-types";

import { AccountOperationFilterButton } from "./account-operation-filter-button";
import { AccountOperationsList } from "./account-operations-list";
import styles from "./account-operations-page.module.scss";
import { AccountOperationsSummary } from "./account-operations-summary";
import { AccountOperationsToolbar } from "./account-operations-toolbar";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_a, texts_b, texts_h, texts_l, texts_o, texts_t } from "@/services/localization/texts";
import { emptyFunction } from "@/utils/empty-function";

interface IAccountOperationsViewProps {
	accountType: AccountTypeFilter;
	hasNext?: boolean;
	isError?: boolean;
	isFetching?: boolean;
	isFiltersExpanded: boolean;
	isLoading?: boolean;
	onAccountTypeChange: (value: AccountTypeFilter) => void;
	onBack: VoidFunction;
	onFiltersToggle: VoidFunction;
	onOperationTypeChange: (value: OperationTypeFilter) => void;
	onLoadMore?: VoidFunction;
	onPeriodChange: (value: OperationPeriod) => void;
	onSearchChange: (value: string) => void;
	operationType: OperationTypeFilter;
	operations: IAccountOperation[];
	period: OperationPeriod;
	search: string;
	summary: IAccountOperationsSummary;
}

export function AccountOperationsView(props: IAccountOperationsViewProps) {
	const {
		accountType,
		hasNext = false,
		isError = false,
		isFetching = false,
		isFiltersExpanded,
		isLoading = false,
		onAccountTypeChange,
		onBack,
		onFiltersToggle,
		onLoadMore = emptyFunction,
		onOperationTypeChange,
		onPeriodChange,
		onSearchChange,
		operationType,
		operations,
		period,
		search,
		summary,
	} = props;
	const { i18n } = useTranslation();
	const { t } = useBntTranslate();
	const periods = [
		{ label: t(texts_l.last_30_days), value: OperationPeriod.thirtyDays },
		{ label: t(texts_l.last_3_months), value: OperationPeriod.threeMonths },
		{ label: t(texts_t.this_year), value: OperationPeriod.year },
		{ label: t(texts_a.all_time), value: OperationPeriod.allTime },
	];

	return (
		<div className={styles.page} data-testid="account-operations-page">
			<BntSectionHeader className={styles.pageHeader}>
				<IconButton className={styles.backButton} aria-label={t(texts_b.back)} onClick={onBack}>
					<ArrowBackRounded />
				</IconButton>
				<div className={styles.heading}>
					<BntTypography as="h1" variant="h4">
						<span className={styles.desktopTitle}>{t(texts_o.operations_history, { capitalize: true })}</span>
						<span className={styles.mobileTitle}>{t(texts_h.history, { capitalize: true })}</span>
					</BntTypography>
					<BntTypography className={styles.subtitle} color="text.secondary">
						{t(texts_a.account_operations_subtitle, { count: summary.operationsCount })}
					</BntTypography>
				</div>
				<IconButton className={styles.mobileFilterButton} aria-expanded={isFiltersExpanded} aria-label={t(texts_o.operation_filters)} onClick={onFiltersToggle}>
					<FilterListRounded />
				</IconButton>
				<div className={styles.periodFilters} data-expanded={isFiltersExpanded}>
					{periods.map((item) => (
						<AccountOperationFilterButton data-testid={`period-filter-${item.value}`} isSelected={item.value === period} key={item.value} onClick={() => onPeriodChange(item.value)}>
							{item.label}
						</AccountOperationFilterButton>
					))}
				</div>
			</BntSectionHeader>
			<AccountOperationsSummary summary={summary} />
			<div className={styles.historySurface}>
				<AccountOperationsToolbar
					accountType={accountType}
					isExpanded={isFiltersExpanded}
					onAccountTypeChange={onAccountTypeChange}
					onOperationTypeChange={onOperationTypeChange}
					onSearchChange={onSearchChange}
					operationType={operationType}
					search={search}
					summary={summary}
				/>
				<AccountOperationsList hasNext={hasNext} isError={isError} isFetching={isFetching} isLoading={isLoading} locale={i18n.language} onLoadMore={onLoadMore} operations={operations} />
			</div>
		</div>
	);
}
