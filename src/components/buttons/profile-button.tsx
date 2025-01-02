import { FC } from "react";
import { Avatar, Typography } from "@mui/material";
import { BntTransparentButton } from "shared/ui/buttons/transparent-button";
import { TProfile } from "@/types/model";

export const BntProfileButton: FC<{
	profile: TProfile;
	onClick: () => void;
	className?: string;
}> = ({ profile, onClick, className }) => {
	return (
		<BntTransparentButton
			className={className}
			onClick={onClick}
			disableRipple
			startIcon={
				<Avatar
					src={profile.user_avatar?.thumb?.url || undefined}
					alt={`${profile.name} ${profile.name}`}
				/>
			}
		>
			<Typography variant="body2">{profile.name && <span>{profile.name}</span>}</Typography>
		</BntTransparentButton>
	);
};
