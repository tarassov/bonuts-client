import type { FC } from "react";
import { BlockOutlined, CakeOutlined, CheckOutlined, EditOutlined } from "@mui/icons-material";

import { BntIconButton } from "@/shared/ui/icon-button";
import { BntStack } from "@/shared/ui/stack";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useBonutsIcon } from "@/hooks/use-bonuts-icon";
import { texts_a, texts_d, texts_e } from "@/services/localization/texts";
import { texts_t } from "@/services/localization/texts/texts_t";
import { emptyFunction } from "@/utils/empty-function";

type TEmployeeActionsProps = {
	onTransferClick?: VoidFunction;
	onAdminDepositClick?: VoidFunction;
	onDisableClick?: VoidFunction;
	onActivateClick?: VoidFunction;
	onEditClick?: VoidFunction;
	allowDisable?: boolean;
	allowActivate?: boolean;
	allowAdminDeposit?: boolean;
	allowEdit?: boolean;
};

export const EmployeeActions: FC<TEmployeeActionsProps> = ({
	onAdminDepositClick = emptyFunction,
	onEditClick = emptyFunction,
	onTransferClick = emptyFunction,
	onActivateClick = emptyFunction,
	onDisableClick = emptyFunction,
	allowAdminDeposit,
	allowDisable,
	allowActivate,
	allowEdit,
}) => {
	const { translate } = useBntTranslate();
	const { BonutsCurrency } = useBonutsIcon();

	return (
		<BntStack direction="row" className="mr-4" justifyContent="flex-end">
			<BntIconButton color="primary" tooltip={translate(texts_t.transfer_donuts)} onClick={onTransferClick}>
				<CakeOutlined />
			</BntIconButton>
			{allowEdit ? (
				<BntIconButton customIcon tooltip={`${translate(texts_e.edit)}`} onClick={onEditClick}>
					<EditOutlined color="secondary" />
				</BntIconButton>
			) : null}
			{allowAdminDeposit ? (
				<BntIconButton customIcon tooltip={`${translate(texts_t.transfer_points)}`} onClick={onAdminDepositClick}>
					<BonutsCurrency />
				</BntIconButton>
			) : null}
			{allowDisable ? (
				<BntIconButton color="error" tooltip={`${translate(texts_d.disable_account)}`} onClick={onDisableClick}>
					<BlockOutlined />
				</BntIconButton>
			) : null}
			{allowActivate ? (
				<BntIconButton color="primary" tooltip={`${translate(texts_a.activate)}`} onClick={onActivateClick}>
					<CheckOutlined />
				</BntIconButton>
			) : null}
		</BntStack>
	);
};
