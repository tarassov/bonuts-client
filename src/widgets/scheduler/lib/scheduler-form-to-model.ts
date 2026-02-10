import { timeToSecondsFromMidnight } from "shared/lib/time-to-seconds-from-midnight";

import { TSchedulerFormFields } from "@/widgets/scheduler/types/scheduler-form-fields";

import { TNewScheduler } from "@/types/model/scheduler";

export const schedulerFormToModel = (formValues: TSchedulerFormFields): TNewScheduler => {
	const { timezoneValue, time, ...rest } = formValues;
	return {
		...rest,
		timezone: timezoneValue ? timezoneValue.value : undefined,
		time_in_seconds: timeToSecondsFromMidnight(time),
	};
};
