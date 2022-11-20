import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import React, { FC } from "react";
import { push } from "redux-first-history";
import { useAppDispatch } from "../../services/store/store";

type BNTRouteMenuButtonProps = {
	route: TRoute;
	showFullName: boolean;
	showTooltip?: boolean;
};
export const BNTRouteMenuButton: FC<BNTRouteMenuButtonProps> = ({
	route,
	showFullName,
	showTooltip,
}) => {
	const dispatch = useAppDispatch();
	const onClick = () => {
		dispatch(push(route.path));
	};

	return (
		<Tooltip title={route.navbarName} disableHoverListener={!showTooltip}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: showFullName ? "initial" : "center",
					px: 2.5,
				}}
				onClick={onClick}
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
					primary={route.navbarName}
					sx={{ opacity: showFullName ? 1 : 0 }}
				/>
			</ListItemButton>
		</Tooltip>
	);
};
