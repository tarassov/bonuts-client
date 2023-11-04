import { TBaseModel } from "@/types/model/base-model";
import { TPicture } from "@/types/model/picture";

export type TComment = TBaseModel & {
	content: string;
	liked?: boolean;
	likes: number;
	profile?: {
		id: number;
		user_name?: string;
		user_avatar?: TPicture;
	};
	public: boolean;
	user_avatar: TPicture;
	user_name: string;
	date_string: string;
};
