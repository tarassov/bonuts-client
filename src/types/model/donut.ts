import { TComment } from "./comment";
import { TCommentable, TLikeable } from "./type-extension";
import { TPicture } from "./picture";

export type TDonut = {
	name: string;
	price?: number;
	id: number;
	active: boolean;
	logo?: TPicture;
	description?: string;
	has_remains?: boolean;
	on_stock?: number;
	supply_days?: number;
	expiration_date?: string;
	created_at?: string;
} & TCommentable &
	TLikeable;
