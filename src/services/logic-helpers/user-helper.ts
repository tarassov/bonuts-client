import { Symbols } from "../../constants/symbols";
import { TProfile } from "../../types/model";
import { Roles } from "../../constants/roles";

export const getUserName = (name?: string, surname?: string) => {
	return `${name}${name ? Symbols.Space : Symbols.Empty}${surname}`;
};

export const isAdmin = (profile: TProfile | null | undefined): boolean => {
	return profile?.roles?.includes(Roles.admin) || profile?.admin || false;
};

export const UserLogic = {
	isAdmin: isAdmin,
	getUserName: getUserName,
};
