import { TUser } from "./user";

export type TProfile = {
	id?: number;
	user_id?: number;
	position?: string;
	user_name?: string;
	admin?: boolean;
	user_avatar?: {
		url?: string | null;
		thumb?: {
			url: string | null;
		};
		preview?: {
			url: string | null;
		};
	};
};
