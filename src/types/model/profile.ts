import { TUser } from "./user";

export type TProfile = TUser & {
	position: string;
	admin: boolean;
	user_avatar?: {
		url: string | null;
		thumb: {
			url: string | null;
		};
		preview: {
			url: string | null;
		};
	};
};
