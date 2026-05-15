import { DefaultProfilePng } from "@/shared/ui/icons";

import { EventCard } from "./event-card";
import type { TPost } from "@/types/model/post";

const publicPost: TPost = {
	id: 1,
	title: "Maria recognized Alex",
	content: "Thanks for helping the support team prepare the onboarding checklist. The handoff felt clear and kind.",
	public: true,
	commentable: true,
	comments: [],
	comments_count: 4,
	likeable: true,
	likes: [{ id: 1 }, { id: 2 }],
	liked: true,
	editable: false,
	date_string_utc: "2026-05-15T09:30:00.000Z",
	profile: {
		id: 12,
		name: "Maria Ivanova",
		user_name: "Maria Ivanova",
		position: "Customer Success Lead",
		user_avatar: {
			url: DefaultProfilePng,
			thumb: {
				url: DefaultProfilePng,
			},
		},
		last_seen_at: new Date().toISOString(),
	},
};

const notificationPost: TPost = {
	...publicPost,
	id: 2,
	title: "Private notification",
	content: "Your teammate sent a private appreciation note.",
	public: false,
	likes: [],
	liked: false,
	comments_count: 0,
};

const meta = {
	title: "Base Elements/Event Card",
	component: EventCard,
	args: {
		post: publicPost,
		preventNewModal: true,
	},
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const PublicRecognition = {};

export const PrivateNotification = {
	args: {
		post: notificationPost,
	},
};
