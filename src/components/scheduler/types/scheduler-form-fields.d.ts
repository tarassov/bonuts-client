import { ITimezoneOption } from "shared/types/timezones";
import { TScheduler } from "@/types/model/scheduler";

export type TSchedulerFormFields = Partial<TScheduler> &
	Required<Pick<TScheduler, "name" | "comment">> & {
		timezoneValue?: ITimezoneOption | false;
		time?: string;
	};
