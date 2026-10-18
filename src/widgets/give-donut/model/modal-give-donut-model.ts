import type { TProfile } from "@/types/model";

export enum GiveDonutStep {
	Search = "search",
	Transfer = "transfer",
	Success = "success",
}

export type TSelectedEmployee = {
	id: number;
	name: string;
	avatarUrl?: string | null;
};

export const getEmployeeDisplayName = (employee: TProfile, noNameFallback: string) => {
	return employee.name || employee.user_name || noNameFallback;
};

export const getEmployeeAvatarUrl = (employee: TProfile) => {
	return employee.user_avatar?.thumb?.url || employee.user_avatar?.url;
};
