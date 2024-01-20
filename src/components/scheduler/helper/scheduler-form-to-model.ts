import { TSchedulerFormFields } from "components/scheduler/types/scheduler-form-fields";
import { timeToSecondsFromMidnight } from "shared/helpers/time-to-seconds-from-midnight";
import { TNewScheduler } from "@/types/model/scheduler";

export const schedulerFormToModel = (formValues: TSchedulerFormFields): TNewScheduler => {
	const { timezoneValue, time, ...rest } = formValues;
	return {
		...rest,
		timezone: timezoneValue ? timezoneValue.value : undefined,
		time_in_seconds: timeToSecondsFromMidnight(time),
	};
};
