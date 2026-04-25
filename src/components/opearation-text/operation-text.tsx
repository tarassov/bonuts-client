import { FC } from "react";
import { Button, Grid, Typography } from "@mui/material";

import classNames from "classnames";

import { OPERATION_CLASSES } from "components/opearation-text/classes";
import { EMPTY_FUNCTION } from "constants/functions";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntProfileButton } from "shared/ui/profile-button";

import { formatStringDate } from "@/shared/lib/date";

import { DealType } from "@/types/model/deal-type";
import type { TOperation } from "@/types/model/operation";

type BntOperationTextProps = {
	operation: TOperation;
	onToProfileClick?: (operation: TOperation) => any;
	onFromProfileClick?: (operation: TOperation) => any;
	onPurchaseClick?: (operation: TOperation) => any;
	className?: string;
	showDateTime?: boolean;
	variant?: "default" | "event";
};
export const BntOperationText: FC<BntOperationTextProps> = ({
	operation,
	onToProfileClick = EMPTY_FUNCTION,
	onFromProfileClick = EMPTY_FUNCTION,
	onPurchaseClick = EMPTY_FUNCTION,
	className,
	showDateTime,
	variant = "default",
}) => {
	const { to_profile, direction, deal_type, from_profile, created_at, created_at_utc } = operation;
	const { translate } = useBntTranslate();

	const amountClass = classNames({
		[OPERATION_CLASSES.operationText]: true,
		[OPERATION_CLASSES.amountText]: true,
		[OPERATION_CLASSES.plusText]: operation && direction && direction > 0,
		[OPERATION_CLASSES.minusText]: operation && direction && direction < 0,
	});

	const toProfileClick = () => {
		onToProfileClick(operation);
	};
	const fromProfileClick = () => {
		onFromProfileClick(operation);
	};
	const purchaseClick = () => {
		onPurchaseClick(operation);
	};

	return (
		<div className={className}>
			{operation !== undefined && operation !== null && (
				<Grid container className={OPERATION_CLASSES.operationContainer}>
					<span className={amountClass}>
						{operation.direction === 1 ? "+" : ""}
						{operation.amount}{" "}
					</span>
					{to_profile && (
						<>
							<span className={classNames(OPERATION_CLASSES.operationText, OPERATION_CLASSES.emojiText)} role="img" aria-label={translate("donut") || "donut"}>
								🍩
							</span>
							{variant === "event" ? <span className={classNames(OPERATION_CLASSES.operationText, OPERATION_CLASSES.eventArrow)}>→</span> : null}
							<BntProfileButton profile={to_profile} onClick={toProfileClick} className={OPERATION_CLASSES.profileButton} textClassName={OPERATION_CLASSES.profileName} />
						</>
					)}
					{from_profile && (
						<>
							<span className={OPERATION_CLASSES.operationText}>{translate("from")}</span>
							<BntProfileButton profile={from_profile} onClick={fromProfileClick} />
						</>
					)}
					{showDateTime && created_at !== undefined && created_at !== null && (
						<span className={OPERATION_CLASSES.operationText}>
							<Typography variant="body2">{formatStringDate(created_at_utc, false, true)}</Typography>
						</span>
					)}
					{(operation.deal_type === DealType.Buy || operation.deal_type === DealType.RefundRequest) && (
						<Button onClick={purchaseClick}>{translate(deal_type === DealType.RefundRequest ? DealType.Refund : DealType.Purchase)}</Button>
					)}
				</Grid>
			)}
		</div>
	);
};
