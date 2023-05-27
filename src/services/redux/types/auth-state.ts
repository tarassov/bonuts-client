import { TProfile } from "@/types/model";

export type TAuthState = {
	token?: string;
	isAuthenticated: boolean;
	tenant: string | null;
	profile?: TProfile;
};
