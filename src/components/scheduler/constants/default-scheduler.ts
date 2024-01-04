import { TScheduler, TSchedulerType } from "@/types/model/scheduler";

export const defaultScheduler: Partial<TScheduler> = {
	amount: 0,
	comment: "",
	time: "01.01.2000 12:00",
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	weekday: 1,
	name: "new scheduler",
	every: TSchedulerType.daily,
	day: 1,
};
