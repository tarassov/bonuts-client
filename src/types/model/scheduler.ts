import { TBaseModel } from "@/types/model/base-model";
import { TProfile } from "@/types/model/profile";

export enum TSchedulerType {
	daily = "daily",
	weekly = "weekly",
}

export type TScheduler = TBaseModel & {
	name?: string;
	amount?: number;
	comment?: string;
	day?: number;
	weekday?: number;
	every?: TSchedulerType;
	execute_time?: string;
	time_in_seconds?: number;
	timezone?: string;
	burn_old?: boolean;
	profile?: TProfile;
};

export type TNewScheduler = Omit<TScheduler, "id">;
