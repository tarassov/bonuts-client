import { TBaseModel } from "./base-model";
import { TPicture } from "./picture";
import { TCommentable, TLikeable } from "./type-extension";

export type TDonut = TBaseModel &
	TCommentable &
	TLikeable & {
		name: string;
		price: number;
		active: boolean;
		logo?: TPicture;
		description?: string;
		has_remains?: boolean;
		on_stock?: number;
		supply_days?: number;
		expiration_date?: string;
		created_at?: string;
	};
