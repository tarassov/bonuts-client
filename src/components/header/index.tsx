import { Avatar, Box, IconButton, Stack, useMediaQuery } from "@mui/material";
import { FC, useContext, useState, MouseEvent } from "react";
import { BntAppBar } from "../../base/menu/app-bar";
import { BntToolbar } from "../../base/toolbar";
import { BntTypography } from "../../base/typography/typography";
import { TProfile } from "../../types/model";
import { AppContext } from "../../context/app-context";
import { ReactSVG } from "react-svg";
import { logoSmall } from "../../constants/icons";
import { Theme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { BntRoutesMenu } from "../main-menu/routes-menu";
type BTNHeaderProps = {
	profile?: TProfile | null;
};

export const BTNHeader: FC<BTNHeaderProps> = ({ profile }) => {
	const { isDrawerOpen, toggleDrawer } = useContext(AppContext);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<BntAppBar position="fixed" open={isDrawerOpen && matches}>
			<BntToolbar disableGutters={true}>
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
							<BntTypography variant="button">
								{profile?.user_name}
							</BntTypography>
							<br />
							<BntTypography variant="caption" display="block" gutterBottom>
								{profile?.position}
							</BntTypography>
						</div>
					</Box>
					<div>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="Avatar"
							onClick={handleClick}
						>
							<Avatar alt={`${profile?.user_name}`} />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							id="account-menu"
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<BntRoutesMenu showFullName />
						</Menu>
					</div>
				</Stack>
			</BntToolbar>
		</BntAppBar>
	);
};
