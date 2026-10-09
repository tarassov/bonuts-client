import React, { FC } from "react";
import { ListItem } from "@mui/material";

import { useAuthRoutes } from "hooks/use-auth-routes";
import { useLocationTyped } from "hooks/use-location-typed";

import { BntRouteMenuButton } from "./route-menu-button";

export const BntRoutesMenu: FC<BntRoutesMenuProps> = ({ showFullName, showTooltip }) => {
	const { menuRoutes } = useAuthRoutes();
	const location = useLocationTyped();
	const activeRoutePath = menuRoutes
		.filter((route) => (route.path === "/" ? location.pathname === route.path : location.pathname === route.path || location.pathname.startsWith(`${route.path}/`)))
		.sort((firstRoute, secondRoute) => secondRoute.path.length - firstRoute.path.length)[0]?.path;

	return (
		<>
			{menuRoutes.map((route) => (
				<ListItem key={route.navbarName} disablePadding sx={{ display: "block", pt: 0, pb: 0 }}>
					<BntRouteMenuButton isActive={route.path === activeRoutePath} route={route} showFullName={showFullName} showTooltip={showTooltip} />
				</ListItem>
			))}
		</>
	);
};
