import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";

import { secondsToTime } from "shared/lib/seconds-to-time";
import { BntFormSubmit } from "shared/ui/form/bnt-form-submit";
import { useTimezone } from "shared/ui/form/hooks/use-timezone";

import { emptyFunction } from "utils/empty-function";

import { texts_n } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { schedulerFormToModel } from "../lib/scheduler-form-to-model";
import { useSchedulerValidation } from "../model/use-scheduler-validation";

import { SchedulerFormFields } from "./scheduler-form-fields";

import type { TNewScheduler, TScheduler } from "@/types/model/scheduler";
import type { TSchedulerFormFields } from "../types/scheduler-form-fields";

import { defaultScheduler } from "@/widgets/scheduler/constants/default-scheduler";

export const SchedulerForm: FC<{
	defaultValue?: TScheduler;
	onSubmit?: (scheduler: TNewScheduler) => void;
	onCancel: VoidFunction;
	submitCaption?: string;
	className?: string;
}> = ({
	onSubmit = emptyFunction,
	onCancel = emptyFunction,
	defaultValue = defaultScheduler,
	submitCaption,
	className,
}) => {
	const { translate } = useBntTranslate();
	const { parseTimezone } = useTimezone();
	const { formSchema } = useSchedulerValidation();

	const formContext = useForm<TSchedulerFormFields>({
		shouldUseNativeValidation: false,
		// @ts-ignore
		resolver: yupResolver(formSchema),
		defaultValues: {
			...defaultValue,
			name: defaultValue.id ? defaultValue.name : translate(texts_n.new_scheduler),
			time: secondsToTime(defaultValue.time_in_seconds),
			timezoneValue: parseTimezone(defaultValue.timezone || defaultScheduler.timezone),
		},
	});

	const handleSubmit = (scheduler: TSchedulerFormFields) => {
		onSubmit(schedulerFormToModel(scheduler));
	};
	return (
		<div className={className}>
			<FormContainer
				formContext={formContext}
				onSuccess={handleSubmit}
				onError={(e) => console.error(e)}
			>
				<SchedulerFormFields />
				<BntFormSubmit visible onCancelClick={onCancel} submitCaption={submitCaption} />
			</FormContainer>
		</div>
	);
};
