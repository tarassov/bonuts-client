import { TProfile } from "./profile";

export type TComment = {
	id: number;
	text: string;
	profile: TProfile;
	created_at: string;
	updated_at: string;
};
