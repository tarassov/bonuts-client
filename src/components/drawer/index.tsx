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

const Drawer: FC = () => {
	const { isDrawerOpen, toggleDrawer } = useContext(AppContext);
	const theme = useTheme();

	return (
		<BNTDrawer variant="permanent" open={isDrawerOpen}>
			<BNTDrawerHeader>
				<IconButton onClick={toggleDrawer}>
					{theme.direction === "rtl" ? <ChevronLeft /> : <ChevronLeft />}
				</IconButton>
			</BNTDrawerHeader>
			<Divider />
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem key={text} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: isDrawerOpen ? "initial" : "center",
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: isDrawerOpen ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								sx={{ opacity: isDrawerOpen ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: isDrawerOpen ? "initial" : "center",
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: isDrawerOpen ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								sx={{ opacity: isDrawerOpen ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</BNTDrawer>
	);
};

export default Drawer;
