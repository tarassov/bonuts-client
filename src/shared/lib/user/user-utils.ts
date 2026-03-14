import { Roles } from "constants/roles";
import { Symbols } from "constants/symbols";

import { TProfile } from "@/types/model";

const ONLINE_TIMEOUT_MS = 5 * 60 * 1000;

export const getUserName = (name?: string, surname?: string) => {
	return `${name}${name ? Symbols.Space : Symbols.Empty}${surname}`;
};

export const isAdmin = (profile?: TProfile | null | undefined): boolean => {
	if (!profile) return false;
	return profile?.roles?.includes(Roles.admin) || profile?.admin || false;
};

export const isOnline = (lastSeenAt?: string | null): boolean => {
	if (!lastSeenAt) return false;

	const lastSeenTime = new Date(lastSeenAt).getTime();
	if (Number.isNaN(lastSeenTime)) return false;

	return Date.now() - lastSeenTime <= ONLINE_TIMEOUT_MS;
};

export const UserLogic = {
	isAdmin,
	getUserName,
	isOnline,
};
