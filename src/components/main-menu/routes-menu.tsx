import React, { FC, useContext } from "react";
import { ListItem } from "@mui/material";
import { BNTRouteMenuButton } from "./route-menu-button";
import { AppContext } from "../../context";

export const BNTRoutesMenu: FC<BNTRoutesMenuProps> = ({
	showFullName,
	showTooltip,
}) => {
	const { routes } = useContext(AppContext);
	return (
		<>
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
		</>
	);
};
