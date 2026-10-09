import { useState } from "react";
import { DonutSmallOutlined, ExpandMoreRounded, ShoppingBagOutlined, UndoRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { present } from "@/shared/lib/type-guards";
import { BntTransparentButton } from "@/shared/ui/buttons";
import { BntChip } from "@/shared/ui/chip";
import { BntTypography } from "@/shared/ui/typography";

import { useDonutUi } from "@/entities/donut";

import { AccountTypeFilter, type IAccountOperation, OperationTypeFilter, PurchaseRequestStatus } from "../model/account-operations-types";

import styles from "./account-operations-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useBonutsIcon } from "@/hooks/use-bonuts-icon";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { texts_f, texts_p, texts_r, texts_s, texts_t } from "@/services/localization/texts";

export function AccountOperationRow({ operation }: { operation: IAccountOperation }) {
	const { t } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	const { BonutsCurrency } = useBonutsIcon({ height: "17px", width: "17px" });
	const { showDonut } = useDonutUi();
	const { showEmployeeModal } = useEmployeeUi();
	const product = operation.product;
	const profile = operation.profile;
	const isPositive = operation.amount > 0;
	const hasFromProfile = Boolean(profile?.id && profile.name);
	const hasDetails = operation.purchaseStatus !== undefined || hasFromProfile || Boolean(operation.description);
	const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
	const purchaseStatusPresenter: Record<PurchaseRequestStatus, string> = {
		[PurchaseRequestStatus.new]: t(texts_r.request_new, { capitalize: true }),
		[PurchaseRequestStatus.processing]: t(texts_r.request_processing, { capitalize: true }),
		[PurchaseRequestStatus.received]: t(texts_r.request_received, { capitalize: true }),
	};

	const handleProductClick = () => {
		if (product) showDonut(product.id);
	};
	const handleProfileClick = () => {
		if (profile) showEmployeeModal(profile.id);
	};
	const typePresenter = {
		[OperationTypeFilter.all]: { icon: operation.accountType === AccountTypeFilter.donut ? <DonutSmallOutlined /> : <BonutsCurrency />, label: "" },
		[OperationTypeFilter.purchase]: { icon: <ShoppingBagOutlined />, label: t(texts_p.purchase, { capitalize: true }) },
		[OperationTypeFilter.refund]: { icon: <UndoRounded />, label: t(texts_r.refund, { capitalize: true }) },
		[OperationTypeFilter.recognition]: { icon: <DonutSmallOutlined />, label: t(texts_r.recognition, { capitalize: true }) },
	}[operation.operationType];

	const directionText = present(operation.direction) && operation.direction < 0 ? t(texts_t.to) : t(texts_f.from);

	return (
		<article className={styles.operationRow} data-expanded={isDetailsExpanded} data-has-details={hasDetails} data-testid="account-operation-row">
			<div className={styles.operationIcon} data-type={operation.operationType}>
				{typePresenter.icon}
			</div>
			<div className={styles.operationContent}>
				<div className={styles.operationTitleLine}>
					{product ? (
						<BntTransparentButton className={styles.operationTitle} color="inherit" disableRipple onClick={handleProductClick}>
							{product.name}
						</BntTransparentButton>
					) : (
						<BntTypography as="h3" className={styles.operationTitle}>
							{operation.title}
						</BntTypography>
					)}
					{typePresenter.label ? <BntChip className={styles.operationBadge} label={typePresenter.label} size="small" /> : null}
				</div>
			</div>
			{hasDetails ? (
				<div className={styles.operationDetails}>
					{operation.purchaseStatus !== undefined ? <BntChip className={styles.operationStatus} label={purchaseStatusPresenter[operation.purchaseStatus]} size="small" /> : null}
					{profile?.id && profile.name ? (
						<BntTransparentButton className={styles.operationDetail} onClick={handleProfileClick}>
							{directionText} {profile.name}
						</BntTransparentButton>
					) : null}
					{operation.description && operation.purchaseStatus === undefined && !hasFromProfile ? (
						<BntTypography as="p" color="text.secondary" variant="caption">
							{operation.description}
						</BntTypography>
					) : null}
				</div>
			) : null}
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
				{operation.accountType === AccountTypeFilter.donut ? <DonutSmallOutlined /> : <BonutsCurrency />}
			</div>
			{hasDetails ? (
				<IconButton
					aria-expanded={isDetailsExpanded}
					aria-label={isDetailsExpanded ? t(texts_s.hide_details) : t(texts_s.show_details)}
					className={styles.operationDetailsToggle}
					onClick={() => setIsDetailsExpanded((isExpanded) => !isExpanded)}
					size="small"
				>
					<ExpandMoreRounded />
				</IconButton>
			) : null}
		</article>
	);
}
