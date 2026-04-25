import type { FC } from "react";
import { Avatar, Typography } from "@mui/material";

import { BntTransparentButton } from "@/shared/ui/buttons";

import type { TProfile } from "@/types/model";

export const BntProfileButton: FC<{
	profile: TProfile;
	onClick: () => void;
	className?: string;
	textClassName?: string;
}> = ({ profile, onClick, className, textClassName }) => {
	return (
		<BntTransparentButton className={className} onClick={onClick} disableRipple startIcon={<Avatar src={profile.user_avatar?.thumb?.url || undefined} alt={`${profile.name} ${profile.name}`} />}>
			<Typography variant="body2" className={textClassName}>
				{profile.name && <span>{profile.name}</span>}
			</Typography>
		</BntTransparentButton>
	);
};
