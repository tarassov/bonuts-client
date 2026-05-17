import { TBaseModel } from "@/types/model/base-model";
import { DealType } from "@/types/model/deal-type";

export type TDeal = TBaseModel & {
	created_at: string;
	deal_type: DealType;
	profile_id?: number;
	comment?: string;
};
