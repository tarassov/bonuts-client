import React, { FC, useContext } from "react";
import { ListItem } from "@mui/material";
import { AppContext } from "context/app-context";
import { BntRouteMenuButton } from "./route-menu-button";

export const BntRoutesMenu: FC<BntRoutesMenuProps> = ({ showFullName, showTooltip }) => {
	const { menuRoutes } = useContext(AppContext);
	// const { auth, signOut } = useAuth();
	return (
		<>
			{menuRoutes.map((route) => (
				<ListItem key={route.navbarName} disablePadding sx={{ display: "block", pt: 0, pb: 0 }}>
					<BntRouteMenuButton route={route} showFullName={showFullName} showTooltip={showTooltip} />
				</ListItem>
			))}
		</>
	);
};
