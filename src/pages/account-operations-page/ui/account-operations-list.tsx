import { Alert, CircularProgress } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

import { groupAccountOperations } from "../model/account-operations-presenter";
import type { IAccountOperation } from "../model/account-operations-types";

import { AccountOperationGroup } from "./account-operation-group";
import styles from "./account-operations-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n, texts_o } from "@/services/localization/texts";

interface IAccountOperationsListProps {
	isError: boolean;
	isFetching: boolean;
	isLoading: boolean;
	locale: string;
	operations: IAccountOperation[];
}

export function AccountOperationsList({ isError, isFetching, isLoading, locale, operations }: IAccountOperationsListProps) {
	const { t } = useBntTranslate();
	const groups = groupAccountOperations(operations, locale);

	if (isLoading) {
		return (
			<div className={styles.listState} data-testid="account-operations-loading">
				<CircularProgress size={28} />
			</div>
		);
	}

	if (isError) return <Alert severity="error">{t(texts_o.operations_loading_error, { capitalize: true })}</Alert>;

	if (!groups.length) {
		return (
			<div className={styles.listState} data-testid="account-operations-empty">
				<BntTypography color="text.secondary">{t(texts_n.no_operations, { capitalize: true })}</BntTypography>
			</div>
		);
	}

	return (
		<div className={styles.operationsList} aria-busy={isFetching}>
			{isFetching ? <CircularProgress className={styles.fetchingIndicator} size={20} /> : null}
			{groups.map((group) => (
				<AccountOperationGroup group={group} key={group.key} />
			))}
		</div>
	);
}
