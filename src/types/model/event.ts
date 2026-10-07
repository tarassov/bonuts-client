import type { TBaseModel } from "./base-model";
import type { TComment } from "@/types/model/comment";

export type TEventImage = {
	url?: string | null;
	thumb?: {
		url?: string | null;
	} | null;
};

export type TEvent = TBaseModel & {
	comments?: Array<TComment>;
	public?: boolean;
	content?: string;
	extra_content?: string;
	date_string?: string;
	date_string_utc?: string;
	editable?: boolean;
	images?: Array<TEventImage>;
};
