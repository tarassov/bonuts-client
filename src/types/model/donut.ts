import { TCommentable, TLikeable } from "./type-extension";
import { TPicture } from "./picture";
import { TBaseModel } from "./base-model";

export type TDonut = TBaseModel &
	TCommentable &
	TLikeable & {
		name: string;
		price?: number;
		active: boolean;
		logo?: TPicture;
		description?: string;
		has_remains?: boolean;
		on_stock?: number;
		supply_days?: number;
		expiration_date?: string;
		created_at?: string;
	};
