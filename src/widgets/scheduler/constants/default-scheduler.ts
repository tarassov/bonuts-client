import { TScheduler, TSchedulerType } from "@/types/model/scheduler";

export const defaultScheduler: Partial<TScheduler> = {
	amount: 0,
	comment: "",
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	weekday: 1,
	name: "new scheduler",
	every: TSchedulerType.daily,
	day: 1,
};
