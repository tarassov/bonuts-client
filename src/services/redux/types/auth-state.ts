import { TProfile } from "@/types/model";

export type TAuthState = {
	token?: string;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	tenant?: string;
	profile?: TProfile;
};
