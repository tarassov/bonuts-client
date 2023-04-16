import { FC } from "react";
import { Avatar, Typography } from "@mui/material";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { TProfile } from "@/types/model";

export const BntProfileButton: FC<{
	profile: TProfile;
	onClick: () => void;
}> = ({ profile, onClick }) => {
	return (
		<BntTransparentButton
			onClick={onClick}
			disableRipple
			startIcon={
				<Avatar
					src={profile.user_avatar?.thumb?.url || undefined}
					alt={`${profile.user_name} ${profile.user_name}`}
				/>
			}
		>
			<Typography variant="body2">
				{profile.user_name && <span>{profile.user_name}</span>}
			</Typography>
		</BntTransparentButton>
	);
};
