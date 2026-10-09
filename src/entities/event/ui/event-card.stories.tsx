import { DefaultProfilePng } from "@/shared/ui/icons";

import { EventCardStyled } from "./event-card-styled";
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
		is_online: true,
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

const postWithImages: TPost = {
	...publicPost,
	id: 3,
	content: "Congratulations to this week's winners! Your support and care make the team stronger.",
	images: [
		{
			url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85",
			thumb: { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80" },
		},
		{
			url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=85",
			thumb: { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80" },
		},
	],
};

const meta = {
	title: "Entities/Event/Event Card",
	component: EventCardStyled,
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

export const WithImages = {
	args: {
		post: postWithImages,
	},
};
