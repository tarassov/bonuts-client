import { ChevronLeft } from "@mui/icons-material";
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { BNTDrawer, BNTDrawerHeader } from "../../base/BNTDrawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AppContext } from "../../context";
import { ReactSVG } from "react-svg";
import { logoFull } from "../../constants/icons";
import { BNTMainMenu } from "../main-menu";

type BNTSidebarProps = {
	routes: Array<TRoute>;
};

const BNTSidebar: FC<BNTSidebarProps> = ({ routes }) => {
	const { isDrawerOpen, toggleDrawer } = useContext(AppContext);
	const theme = useTheme();

	return (
		<BNTDrawer variant="permanent" open={isDrawerOpen}>
			<BNTDrawerHeader>
				<ReactSVG src={logoFull} />
				<IconButton onClick={toggleDrawer}>
					{theme.direction === "rtl" ? <ChevronLeft /> : <ChevronLeft />}
				</IconButton>
			</BNTDrawerHeader>
			<Divider />
			<BNTMainMenu routes={routes} showFullName={isDrawerOpen} />
		</BNTDrawer>
	);
};

export default BNTSidebar;
