import { IconButton, List, ListItem, ListItemButton, ListItemIcon, useTheme } from "@mui/material";
import React, { FC, useContext } from "react";

import { ChevronLeft, Menu } from "@mui/icons-material";
import { AppContext } from "context/app-context";
import { BntRoutesMenu } from "./routes-menu";

export const BntMainMenu: FC<BntRoutesMenuProps> = (props) => {
	const { showFullName } = props;

	const { toggleDrawer } = useContext(AppContext);
	const theme = useTheme();

	return (
		<List>
			<ListItem disablePadding sx={{ display: "block", pt: 0, pb: 0 }}>
				<ListItemButton
					onClick={toggleDrawer}
					sx={{
						minHeight: 24,
						justifyContent: showFullName ? "flex-end" : "center",
						px: 2.5,
						pt: 0,
						pb: 0,
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							paddingTop: 0,
							paddingBottom: 0,
						}}
					>
						{!showFullName ? (
							<IconButton onClick={toggleDrawer} sx={{ pt: 0.5, pb: 0.5 }}>
								<Menu />
							</IconButton>
						) : (
							<IconButton onClick={toggleDrawer} sx={{ mr: 0, pr: 0, pt: 0.5, pb: 0.5 }}>
								{theme.direction === "rtl" ? <ChevronLeft /> : <ChevronLeft />}
							</IconButton>
						)}
					</ListItemIcon>
				</ListItemButton>
			</ListItem>
			<BntRoutesMenu {...props} />
		</List>
	);
};
