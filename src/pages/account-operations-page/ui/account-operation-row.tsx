import { ChevronRightRounded, DonutSmallOutlined, PaidOutlined, ShoppingBagOutlined, UndoRounded } from "@mui/icons-material";
import { Chip } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { BntTypography } from "@/shared/ui/typography";

import { AccountTypeFilter, type IAccountOperation, OperationTypeFilter } from "../model/account-operations-types";

import styles from "./account-operations-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_p, texts_r } from "@/services/localization/texts";

export function AccountOperationRow({ operation }: { operation: IAccountOperation }) {
	const { t } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	const isPositive = operation.amount > 0;
	const typePresenter = {
		[OperationTypeFilter.all]: { icon: operation.accountType === AccountTypeFilter.donut ? <DonutSmallOutlined /> : <PaidOutlined />, label: "" },
		[OperationTypeFilter.purchase]: { icon: <ShoppingBagOutlined />, label: t(texts_p.purchase, { capitalize: true }) },
		[OperationTypeFilter.refund]: { icon: <UndoRounded />, label: t(texts_r.refund, { capitalize: true }) },
		[OperationTypeFilter.recognition]: { icon: <DonutSmallOutlined />, label: t(texts_r.recognition, { capitalize: true }) },
	}[operation.operationType];

	return (
		<article className={styles.operationRow} data-testid="account-operation-row">
			<div className={styles.operationIcon} data-type={operation.operationType}>
				{typePresenter.icon}
			</div>
			<div className={styles.operationContent}>
				<div className={styles.operationTitleLine}>
					<BntTypography as="h3" className={styles.operationTitle}>
						{operation.title}
					</BntTypography>
					{typePresenter.label ? <Chip className={styles.operationBadge} label={typePresenter.label} size="small" /> : null}
				</div>
				{operation.description ? (
					<BntTypography as="p" color="text.secondary" variant="caption">
						{operation.description}
					</BntTypography>
				) : null}
			</div>
			<time className={styles.operationDate} dateTime={operation.createdAt}>
				<BntTypography color="text.secondary" variant="caption">
					{getFormattedDate(operation.createdAt, { day: "numeric", hour: "2-digit", minute: "2-digit", month: "short" })}
				</BntTypography>
			</time>
			<div className={styles.operationAmount} data-positive={isPositive}>
				<span>
					{isPositive ? "+" : "−"}
					{Math.abs(operation.amount)}
				</span>
				{operation.accountType === AccountTypeFilter.donut ? <DonutSmallOutlined /> : <PaidOutlined />}
			</div>
			<ChevronRightRounded className={styles.operationChevron} color="disabled" />
		</article>
	);
}
