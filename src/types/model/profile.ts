import { TPicture } from "./picture";
import { TBaseModel } from "./base-model";
import { TCircle } from "@/types/model/circle";

export type TProfile = TBaseModel & {
	user_id?: number;
	position?: string | null;
	name?: string;
	user_name?: string | null;
	admin?: boolean;
	active?: boolean;
	store_admin?: boolean;
	user_avatar?: TPicture;
	email?: string;
	first_name?: string | null;
	last_name?: string | null;
	roles?: Array<string>;
	tenant?: string;
	circles?: Array<TCircle>;
	birthdate?: string | null;
	in_date?: string | null;
	bio?: string;
	contact?: string;
	score_total?: number;
	self_account?: {
		id?: number;
		tenant_id?: number;
		profile_id?: number;
	};
	distrib_account?: {
		id?: number;
		tenant_id?: number;
		profile_id?: number;
	};
	created_at?: string;
	tg_code?: string;
};
