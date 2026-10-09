import { DefaultProfilePng } from "@/shared/ui/icons";

import { EmployeeCard } from "./employee-card";
import type { TProfile } from "@/types/model";

const employee: TProfile = {
	id: 1,
	name: "Alex Kim",
	user_name: "Alex Kim",
	position: "Product Designer",
	user_avatar: {
		url: DefaultProfilePng,
		thumb: {
			url: DefaultProfilePng,
		},
	},
	score_total: 184,
	last_seen_at: new Date().toISOString(),
	is_online: true,
	in_date: "2024-09-04",
};

const meta = {
	title: "Widgets/Employee Directory/Employee Card",
	component: EmployeeCard,
	args: {
		employee,
	},
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Default = {};

export const Offline = {
	args: {
		employee: {
			...employee,
			is_online: false,
		},
	},
};

export const LongName = {
	args: {
		employee: {
			...employee,
			id: 2,
			name: "Ekaterina Smirnova-Romanova",
			user_name: "Ekaterina Smirnova-Romanova",
		},
	},
};
