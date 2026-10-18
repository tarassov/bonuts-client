import type { ITimezoneOption } from "@/shared/ui/types";
import { TScheduler } from "@/types/model/scheduler";

export type TSchedulerFormFields = Partial<TScheduler> &
	Required<Pick<TScheduler, "name" | "comment">> & {
		timezoneValue?: ITimezoneOption | false;
		time?: string;
	};
