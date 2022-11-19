import { IconButton, styled, SvgIcon } from "@mui/material";
import { FC, useContext } from "react";
import { BNTAppBar } from "../../base/BNTAppBar/BNTAppBar";
import { BNTToolbar } from "../../base/BNTToolbar";
import { BNTTypography } from "../../base/BNTTypography/BNTTypography";
import { TProfile } from "../../types/model/profile";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../../context";
import { ReactSVG } from "react-svg";
import { logoFull, logoSmall } from "../../constants/icons";
type BTNHeaderProps = {
	profile: TProfile;
};

export const BTNHeader: FC<BTNHeaderProps> = ({ profile }) => {
	const { isDrawerOpen, toggleDrawer } = useContext(AppContext);
	return (
		<BNTAppBar position="fixed" open={isDrawerOpen}>
			<BNTToolbar disableGutters={true}>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="Open drawer"
					onClick={toggleDrawer}
					sx={{
						marginRight: 2,
						...(isDrawerOpen && { display: "none" }),
					}}
				>
					{!isDrawerOpen && <ReactSVG src={logoSmall} />}
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
