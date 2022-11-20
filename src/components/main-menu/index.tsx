import {
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	useTheme,
} from "@mui/material";
import React, { FC, useContext } from "react";

import { BNTRouteMenuButton } from "./route-menu-button";
import { ChevronLeft, Menu } from "@mui/icons-material";
import { AppContext } from "../../context";

type BNTMainMenuProps = {
	routes: Array<TRoute>;
	showFullName: boolean;
	showTooltip: boolean;
};
export const BNTMainMenu: FC<BNTMainMenuProps> = ({
	routes,
	showFullName,
	showTooltip,
}) => {
	const { toggleDrawer } = useContext(AppContext);
	const theme = useTheme();

	return (
		<List>
			<ListItem disablePadding sx={{ display: "block" }}>
				<ListItemButton
					onClick={toggleDrawer}
					sx={{
						minHeight: 48,
						justifyContent: showFullName ? "flex-end" : "center",
						px: 2.5,
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
						}}
					>
						{!showFullName ? (
							<IconButton onClick={toggleDrawer}>
								<Menu />
							</IconButton>
						) : (
							<IconButton onClick={toggleDrawer} sx={{ mr: 0, pr: 0 }}>
								{theme.direction === "rtl" ? <ChevronLeft /> : <ChevronLeft />}
							</IconButton>
						)}
					</ListItemIcon>
				</ListItemButton>
			</ListItem>
			{routes.map((route) => (
				<ListItem
					key={route.navbarName}
					disablePadding
					sx={{ display: "block" }}
				>
					<BNTRouteMenuButton
						route={route}
						showFullName={showFullName}
						showTooltip={showTooltip}
					/>
				</ListItem>
			))}
		</List>
	);
};
