import type { ReactNode } from "react";
import { Android } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { OnlineBadge } from "@/shared/ui/badge";

type TProfileAvatarProps = {
	avatarUrl?: string | null;
	name?: string | null;
	fallback?: ReactNode | null;
	hasOnlineBadge?: boolean;
	isOnline?: boolean;
};

const DEFAULT_FALLBACK = <Android />;

export function ProfileAvatar({ avatarUrl, name, fallback = DEFAULT_FALLBACK, hasOnlineBadge = false, isOnline = false }: TProfileAvatarProps) {
	const avatar = (
		<Avatar src={avatarUrl || undefined} alt={name || undefined}>
			{fallback}
		</Avatar>
	);

	if (!hasOnlineBadge) {
		return avatar;
	}

	return <OnlineBadge online={isOnline}>{avatar}</OnlineBadge>;
}
