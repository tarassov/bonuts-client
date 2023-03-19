import { TUser } from "./user";
import { TPicture } from "./picture";

export type TProfile = {
	id?: number;
	user_id?: number;
	position?: string | null;
	user_name?: string | null;
	admin?: boolean;
	user_avatar?: TPicture;
	email?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	roles?: Array<string>;
	tenant?: string;
};
