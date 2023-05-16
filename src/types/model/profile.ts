import { TPicture } from "./picture";
import { TBaseModel } from "./base-model";

export type TProfile = TBaseModel & {
	user_id?: number;
	position?: string | null;
	name?: string;
	user_name?: string | null;
	admin?: boolean;
	user_avatar?: TPicture;
	email: string;
	first_name?: string | null;
	last_name?: string | null;
	roles?: Array<string>;
	tenant?: string;
};
