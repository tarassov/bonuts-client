import { IconButton } from "@mui/material";
import { FC, useContext } from "react";
import { BNTAppBar } from "../../base/BNTAppBar/BNTAppBar";
import { BNTToolbar } from "../../base/BNTToolbar/BNTToolbar";
import { BNTTypography } from "../../base/BNTTypography/BNTTypography";
import { TProfile } from "../../types/model/profile";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../../context";

type BTNHeaderProps = {
	profile: TProfile;
};

export const BTNHeader: FC<BTNHeaderProps> = ({ profile }) => {
	const { isDrawerOpen, toggleDrawer } = useContext(AppContext);
	return (
		<BNTAppBar position="fixed" open={isDrawerOpen}>
			<BNTToolbar>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="Open drawer"
					onClick={toggleDrawer}
					sx={{
						marginRight: 5,
						...(isDrawerOpen && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<div>
					<BNTTypography variant="button">
						{profile.first_name + " " + profile.last_name}
					</BNTTypography>
					<br />
					<BNTTypography variant="caption" display="block" gutterBottom>
						{profile.position}
					</BNTTypography>
				</div>
			</BNTToolbar>
		</BNTAppBar>
	);
};
