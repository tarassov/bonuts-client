import { TBaseModel } from "@/types/model/base-model";

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
	timezone?: string;
};

export type TNewScheduler = Omit<TScheduler, "id">;
