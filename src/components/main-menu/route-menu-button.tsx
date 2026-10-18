import React, { FC } from "react";
import { push } from "redux-first-history";
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useAppDispatch } from "services/redux/store/store";

export const BntRouteMenuButton: FC<BntRouteMenuButtonProps> = ({
	isActive,
	route,
	showFullName,
	showTooltip,
	onBeforeClick = () => {
		return { redirect: true };
	},
}) => {
	const dispatch = useAppDispatch();
	const { translate } = useBntTranslate();
	const onRouteClick = () => {
		const { redirect } = onBeforeClick();
		if (redirect) dispatch(push(route.path));
	};

	return (
		<Tooltip placement="right" title={translate(route.navbarName)} disableHoverListener={!showTooltip}>
			<ListItemButton
				sx={{
					minHeight: 24,
					justifyContent: showFullName ? "initial" : "center",
					px: 2.5,
					pt: 0.5,
					pb: 0.5,
					borderRadius: 2,
					mx: 1,
					background: isActive ? "linear-gradient(90deg, rgba(255,138,61,0.18) 0%, rgba(255,207,134,0.38) 100%)" : "transparent",
					color: isActive ? "primary.main" : "inherit",
					"&:hover": {
						background: isActive ? "linear-gradient(90deg, rgba(255,138,61,0.22) 0%, rgba(255,207,134,0.44) 100%)" : undefined,
					},
				}}
				onClick={onRouteClick}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: showFullName ? 3 : "auto",
						justifyContent: "center",
						color: isActive ? "primary.main" : "inherit",
					}}
				>
					{route.icon}
				</ListItemIcon>
				<ListItemText primary={translate(route.navbarName)} sx={{ opacity: showFullName ? 1 : 0, "& .MuiTypography-root": { fontWeight: isActive ? 600 : 400 } }} />
			</ListItemButton>
		</Tooltip>
	);
};
