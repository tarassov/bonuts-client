import { TUser } from "./user";

export type TProfile = {
	id?: number;
	user_id?: number;
	position?: string | null;
	user_name?: string | null;
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
	email?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	roles?: Array<string>;
};
