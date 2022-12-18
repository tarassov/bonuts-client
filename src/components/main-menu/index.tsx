import {
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	useTheme,
} from "@mui/material";
import React, { FC, useContext } from "react";

import { ChevronLeft, Menu } from "@mui/icons-material";
import { AppContext } from "../../context";
import { BNTRoutesMenu } from "./routes-menu";

export const BNTMainMenu: FC<BNTRoutesMenuProps> = (props) => {
	const { showFullName } = props;

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
			<BNTRoutesMenu {...props} />
		</List>
	);
};
