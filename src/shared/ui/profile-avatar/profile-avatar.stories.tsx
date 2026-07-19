import { Stack } from "@mui/material";

import { DefaultProfilePng } from "@/shared/ui/icons";

import { ProfileAvatar } from "./profile-avatar";

const meta = {
	title: "Shared/UI/Profile Avatar",
	component: ProfileAvatar,
	args: {
		name: "Anna Petrova",
		avatarUrl: DefaultProfilePng,
		hasOnlineBadge: true,
		isOnline: true,
	},
};

export default meta;

export const Online = {};

export const Offline = {
	args: {
		isOnline: false,
	},
};

export const States = {
	render: () => (
		<Stack direction="row" spacing={2} alignItems="center">
			<ProfileAvatar name="Online teammate" avatarUrl={DefaultProfilePng} hasOnlineBadge isOnline />
			<ProfileAvatar name="Offline teammate" avatarUrl={DefaultProfilePng} hasOnlineBadge />
			<ProfileAvatar name="Fallback teammate" hasOnlineBadge isOnline />
		</Stack>
	),
};
