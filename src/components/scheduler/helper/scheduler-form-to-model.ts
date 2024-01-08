import { TSchedulerFormFields } from "components/scheduler/types/scheduler-form-fields";
import { TNewScheduler } from "@/types/model/scheduler";

export const schedulerFormToModel = (formValues: TSchedulerFormFields): TNewScheduler => {
	const { timezoneValue, ...rest } = formValues;
	return { ...rest, timezone: timezoneValue ? timezoneValue.value : undefined };
};
