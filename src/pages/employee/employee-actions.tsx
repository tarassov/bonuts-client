import React, { FC } from "react";
import { emptyFunction } from "utils/empty-function";
import { BntStack } from "shared/stack/stack";
import { BntIconButton } from "shared/icon-button/bnt-icon-button";
import { texts_t } from "services/localization/texts/texts_t";
import { BlockOutlined, CakeOutlined, CheckOutlined } from "@mui/icons-material";
import { texts_a, texts_d } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useIcons } from "hooks/use-icons";

export const EmployeeActions: FC<{
	onTransferClick?: VoidFunction;
	onAdminDepositClick?: VoidFunction;
	onDisableClick?: VoidFunction;
	onActivateClick?: VoidFunction;
	allowDisable?: boolean;
	allowActivate?: boolean;
	allowAdminDeposit?: boolean;
}> = ({
	onAdminDepositClick = emptyFunction,
	onTransferClick = emptyFunction,
	onActivateClick = emptyFunction,
	onDisableClick = emptyFunction,
	allowAdminDeposit,
	allowDisable,
	allowActivate,
}) => {
	const { translate } = useBntTranslate();
	const { BonutsCurrency } = useIcons();

	return (
		<BntStack direction="row" className="mr-4" justifyContent="flex-end">
			<BntIconButton
				color="primary"
				tooltip={translate(texts_t.transfer_donuts)}
				onClick={onTransferClick}
			>
				<CakeOutlined />
			</BntIconButton>
			{allowAdminDeposit && (
				<BntIconButton
					customIcon
					tooltip={`${translate(texts_t.transfer_points)}`}
					onClick={onAdminDepositClick}
				>
					<BonutsCurrency />
				</BntIconButton>
			)}
			{allowDisable && (
				<BntIconButton
					color="error"
					tooltip={`${translate(texts_d.disable_account)}`}
					onClick={onDisableClick}
				>
					<BlockOutlined />
				</BntIconButton>
			)}
			{allowActivate && (
				<BntIconButton
					color="primary"
					tooltip={`${translate(texts_a.activate)}`}
					onClick={onActivateClick}
				>
					<CheckOutlined />
				</BntIconButton>
			)}
		</BntStack>
	);
};
