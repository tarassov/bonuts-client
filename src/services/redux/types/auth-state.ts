import { TProfile } from "@/types/model";

export type TAuthState = {
	token: string | null;
	isAuthenticated: boolean;
	tenant: string | null;
	profile?: TProfile | null;
};
