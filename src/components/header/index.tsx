import { Avatar, Box, IconButton, Stack, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import { BNTAppBar } from "../../base/BNTAppBar/BNTAppBar";
import { BNTToolbar } from "../../base/BNTToolbar";
import { BNTTypography } from "../../base/BNTTypography/BNTTypography";
import { TProfile } from "../../types/model";
import { AppContext } from "../../context";
import { ReactSVG } from "react-svg";
import { logoSmall } from "../../constants/icons";
import { Theme } from "@mui/material/styles";
type BTNHeaderProps = {
	profile: TProfile;
};

export const BTNHeader: FC<BTNHeaderProps> = ({ profile }) => {
	const { isDrawerOpen, toggleDrawer } = useContext(AppContext);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	return (
		<BNTAppBar position="fixed" open={isDrawerOpen && matches}>
			<BNTToolbar disableGutters={true}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={1}
					sx={{
						width: "100%",
						mr: "10px",
					}}
				>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="Open drawer"
						onClick={toggleDrawer}
						sx={{
							marginRight: 2,
							...(isDrawerOpen && matches && { display: "none" }),
						}}
					>
						{(!isDrawerOpen || !matches) && <ReactSVG src={logoSmall} />}
					</IconButton>
					<Box
						sx={{
							flex: 1,
						}}
					>
						<div>
							<BNTTypography variant="button">
								{profile.first_name + " " + profile.last_name}
							</BNTTypography>
							<br />
							<BNTTypography variant="caption" display="block" gutterBottom>
								{profile.position}
							</BNTTypography>
						</div>
					</Box>
					<div>
						<IconButton edge="start" color="inherit" aria-label="Avatar">
							<Avatar alt={`${profile.first_name} ${profile.last_name}`} />
						</IconButton>
					</div>
				</Stack>
			</BNTToolbar>
		</BNTAppBar>
	);
};
