import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React, { FC } from "react";
import { BNTRouteMenuButton } from "./route-menu-button";

type BNTMainMenuProps = {
	routes: Array<TRoute>;
	showFullName: boolean;
};
export const BNTMainMenu: FC<BNTMainMenuProps> = ({ routes, showFullName }) => {
	return (
		<List>
			{routes.map((route, index) => (
				<ListItem
					key={route.navbarName}
					disablePadding
					sx={{ display: "block" }}
				>
					<BNTRouteMenuButton route={route} showFullName={showFullName} />
				</ListItem>
			))}
		</List>
	);
};
