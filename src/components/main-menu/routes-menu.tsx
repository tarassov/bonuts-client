import React, { FC } from "react";
import { ListItem } from "@mui/material";
import { useAuthRoutes } from "hooks/use-auth-routes";
import { BntRouteMenuButton } from "./route-menu-button";

export const BntRoutesMenu: FC<BntRoutesMenuProps> = ({ showFullName, showTooltip }) => {
	const { menuRoutes } = useAuthRoutes();

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
