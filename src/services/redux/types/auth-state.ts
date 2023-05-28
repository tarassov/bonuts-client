import { TProfile } from "@/types/model";

export type TAuthState = {
	token?: string;
	isAuthenticated: boolean;
	tenant?: string;
	profile?: TProfile;
};
