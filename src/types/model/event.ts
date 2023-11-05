import { TBaseModel } from "./base-model";
import { TComment } from "@/types/model/comment";

export type TEvent = TBaseModel & {
	comments?: Array<TComment>;
	public?: boolean;
	content?: string;
	extra_content?: string;
	date_string?: string;
	date_string_utc?: string;
	editable?: boolean;
};
