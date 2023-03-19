import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import React, { FC } from "react";
import { push } from "redux-first-history";
import { useAppDispatch } from "../../services/store/store";
import { useBntTranslate } from "../../hooks/use-bnt-translate";

export const BntRouteMenuButton: FC<BntRouteMenuButtonProps> = ({
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
		redirect && dispatch(push(route.path));
	};

	return (
		<Tooltip
			placement={"right"}
			title={translate(route.navbarName)}
			disableHoverListener={!showTooltip}
		>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: showFullName ? "initial" : "center",
					px: 2.5,
				}}
				onClick={onRouteClick}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: showFullName ? 3 : "auto",
						justifyContent: "center",
					}}
				>
					{route.icon}
				</ListItemIcon>
				<ListItemText
					primary={translate(route.navbarName)}
					sx={{ opacity: showFullName ? 1 : 0 }}
				/>
			</ListItemButton>
		</Tooltip>
	);
};
