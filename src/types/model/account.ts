import { TBaseModel } from "@/types/model/base-model";

export type TAccount = TBaseModel & {
	balance: number;
	last_operation?: {
		direction?: "+" | "-";
		amount?: number;
		date?: string;
		date_utc?: string;
	};
};
