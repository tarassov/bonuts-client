import React, { FC, useContext } from "react";
import { ListItem } from "@mui/material";
import { BNTRouteMenuButton } from "./route-menu-button";
import { AppContext } from "../../context";
import { useAuth } from "../../hooks/use-auth";

export const BNTRoutesMenu: FC<BNTRoutesMenuProps> = ({
	showFullName,
	showTooltip,
}) => {
	const { menuRoutes } = useContext(AppContext);
	const { auth, signOut } = useAuth();
	return (
		<>
			{menuRoutes.map((route) => (
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
		</>
	);
};
