import { TProfile } from "./profile";
import { DealType } from "./deal-type";

export type TOperation = {
	id?: number;
	direction?: number;
	amount?: number;
	to_user_name?: string;
	to_profile?: TProfile;
	from_profile?: TProfile;
	deal_type?: DealType;
	created_at: string;
};
