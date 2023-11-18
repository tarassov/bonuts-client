import { Avatar, IconButton, Stack, useMediaQuery } from "@mui/material";
import { FC, useContext, useState, MouseEvent } from "react";
import { Theme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { BntAppBar } from "shared/menu/app-bar";
import { BntToolbar } from "shared/toolbar";
import { BntTypography } from "shared/typography/typography";
import { AppContext } from "context/app-context";
import { BntStack } from "shared/stack/stack";
import { AccountBalanceSmall } from "components/account-balance/account-balance-small";
import { TProfile } from "@/types/model";
import { BntRoutesMenu } from "../main-menu/routes-menu";

type BTNHeaderProps = {
	profile?: TProfile | null;
};

export const BTNHeader: FC<BTNHeaderProps> = ({ profile }) => {
	const { isDrawerOpen } = useContext(AppContext);
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
		<BntAppBar position="fixed" open={isDrawerOpen && matches} fullwidth={!matches}>
			<BntToolbar disableGutters>
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
					<BntStack
						direction="column"
						gap={0}
						sx={{
							flex: 1,
							overflow: "hidden",
						}}
					>
						<BntTypography
							variant="button"
							display="block"
							sx={{
								textWrap: "nowrap",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
								overflow: "hidden",
								minWidth: 20,
							}}
						>
							{profile?.user_name}
						</BntTypography>
						<BntTypography
							variant="caption"
							display="block"
							gutterBottom
							sx={{
								textWrap: "nowrap",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
								overflow: "hidden",
								minWidth: 20,
							}}
						>
							{profile?.position}
						</BntTypography>
					</BntStack>
					<BntStack direction="row" alignItems="center" gap={2}>
						<AccountBalanceSmall profile={profile || undefined} />
						<IconButton edge="start" color="inherit" aria-label="Avatar" onClick={handleClick}>
							<Avatar
								src={profile?.user_avatar?.thumb?.url || undefined}
								alt={`${profile?.user_name}`}
							/>
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
					</BntStack>
				</Stack>
			</BntToolbar>
		</BntAppBar>
	);
};
