import { TBaseModel } from "./base-model";
import { TPicture } from "./picture";
import { TCommentable, TLikeable } from "./type-extension";

export type TDonut = TBaseModel &
	TCommentable &
	TLikeable & {
		name: string;
		price: number;
		active: boolean;
		available: boolean;
		logo?: TPicture;
		description?: string;
		use_remains: boolean;
		on_stock?: number;
		supply_days?: number;
		expiration_date?: string | null;
		created_at?: string;
	};
