import { TDonut } from "@/types/model/donut";
import { TProfile } from "@/types/model/profile";

export type TRequest = {
	id: number;
	name?: string;
	public_uid?: string;
	donut_name?: string;
	created_at?: string;
	updated_at?: string;
	status?: number;
	date_used?: string | null;
	deleted?: boolean;
	donut?: Omit<TDonut, "commentable" | "likeable">;
	profile?: TProfile;
	enabled?: boolean;
};
