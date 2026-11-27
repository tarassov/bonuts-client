import type { FC } from "react";
import { useId, useState } from "react";
import { BlockOutlined, CakeOutlined, CheckOutlined, EditOutlined, MoreHoriz, SwitchAccountOutlined } from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BntButton } from "@/shared/ui/buttons";
import { BntStack } from "@/shared/ui/stack";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useBonutsIcon } from "@/hooks/use-bonuts-icon";
import { texts_a, texts_b, texts_d, texts_e, texts_g, texts_m } from "@/services/localization/texts";
import { texts_t } from "@/services/localization/texts/texts_t";
import { emptyFunction } from "@/utils/empty-function";

const GiveDonutsButton = styled(BntButton)(({ theme }) => ({
	minHeight: 44,
	borderRadius: 10,
	color: theme.palette.common.black,
	"&.Mui-focusVisible": { outline: `2px solid ${theme.palette.text.primary}`, outlineOffset: 2 },
	"@media (prefers-reduced-motion: no-preference)": {
		transition: theme.transitions.create(["background-color", "transform"], { duration: theme.transitions.duration.shortest }),
		"&:active": { transform: "scale(0.98)" },
	},
}));

type TEmployeeActionsProps = {
	onTransferClick?: VoidFunction;
	onAdminDepositClick?: VoidFunction;
	onDisableClick?: VoidFunction;
	onActivateClick?: VoidFunction;
	onEditClick?: VoidFunction;
	onBecomeClick?: VoidFunction;
	isBecoming?: boolean;
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
	onBecomeClick,
	isBecoming,
	allowDisable,
	allowActivate,
	allowEdit,
}) => {
	const { translate } = useBntTranslate();
	const { BonutsCurrency } = useBonutsIcon();

	const menuId = useId();
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);

	const selectAction = (action: VoidFunction) => {
		setAnchor(null);
		action();
	};
	const actions = [
		{ enabled: allowEdit, label: texts_e.edit, icon: <EditOutlined />, run: onEditClick },
		{ enabled: allowAdminDeposit, label: texts_t.transfer_points, icon: <BonutsCurrency />, run: onAdminDepositClick },
		{ enabled: allowDisable, label: texts_d.disable_account, icon: <BlockOutlined color="error" />, run: onDisableClick },
		{ enabled: allowActivate, label: texts_a.activate, icon: <CheckOutlined />, run: onActivateClick },
		{ enabled: Boolean(onBecomeClick), label: texts_b.become_user, icon: <SwitchAccountOutlined />, run: onBecomeClick || emptyFunction, disabled: isBecoming },
	].filter(({ enabled }) => enabled);

	return (
		<BntStack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
			<GiveDonutsButton noTransform disableElevation variant="contained" startIcon={<CakeOutlined />} onClick={onTransferClick}>
				{translate(texts_g.give_donuts, { capitalize: true })}
			</GiveDonutsButton>
			{actions.length > 0 ? (
				<>
					<IconButton
						id={`${menuId}-trigger`}
						aria-label={translate(texts_m.more, { capitalize: true })}
						aria-haspopup="menu"
						aria-expanded={Boolean(anchor)}
						aria-controls={anchor ? menuId : undefined}
						onClick={(event) => setAnchor(event.currentTarget)}
						sx={{ width: 44, height: 44 }}
					>
						<MoreHoriz />
					</IconButton>
					<Menu
						anchorEl={anchor}
						open={Boolean(anchor)}
						onClose={() => setAnchor(null)}
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
						transformOrigin={{ vertical: "top", horizontal: "right" }}
						slotProps={{ list: { id: menuId, "aria-labelledby": `${menuId}-trigger` } }}
					>
						{actions.map(({ label, icon, run, disabled }) => (
							<MenuItem key={label} disabled={disabled} onClick={() => selectAction(run)}>
								<ListItemIcon>{icon}</ListItemIcon>
								{translate(label, { capitalize: true })}
							</MenuItem>
						))}
					</Menu>
				</>
			) : null}
		</BntStack>
	);
};
