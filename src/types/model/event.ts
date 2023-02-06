import { TBaseModel } from "./type-extension";

export type TEvent = TBaseModel & {
	public?: boolean;
	content?: string;
	extra_content?: string;
	date_string?: string;
	editable?: boolean;
};
