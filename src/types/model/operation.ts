import { DealType } from "./deal-type";
import { TProfile } from "./profile";
import { TBaseModel } from "@/types/model/base-model";
import { TDeal } from "@/types/model/deal";

export type TOperation = TBaseModel & {
	direction?: number;
	amount?: number;
	user_name?: string;
	to_user_name?: string;
	to_profile?: TProfile;
	from_profile?: TProfile;
	deal_type?: DealType;
	created_at: string;
	created_at_utc: string;
	deal?: TDeal;
};
