import { IconButton } from "@mui/material";
import { FC } from "react";
import { BNTAppBar } from "../../base/BNTAppBar/BNTAppBar";
import { BNTToolbar } from "../../base/BNTToolbar/BNTToolbar";
import { BNTTypography } from "../../base/BNTTypography/BNTTypography";
import { TProfile } from "../../types/model/profile";

type BTNHeaderProps = {
	profile: TProfile;
};

export const BTNHeader: FC<BTNHeaderProps> = ({ profile }) => {
	return (
		<BNTAppBar position="relative">
			<BNTToolbar>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="Open drawer"
				></IconButton>
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
