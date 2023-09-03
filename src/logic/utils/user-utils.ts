import { Symbols } from "constants/symbols";
import { Roles } from "constants/roles";
import { TProfile } from "@/types/model";

export const getUserName = (name?: string, surname?: string) => {
	return `${name}${name ? Symbols.Space : Symbols.Empty}${surname}`;
};

export const isAdmin = (profile?: TProfile | null | undefined): boolean => {
	if (!profile) return false;
	return profile?.roles?.includes(Roles.admin) || profile?.admin || false;
};

export const UserLogic = {
	isAdmin,
	getUserName,
};
