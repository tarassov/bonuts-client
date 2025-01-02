import { FC } from "react";
import { useForm } from "react-hook-form";
import { emptyFunction } from "utils/empty-function";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { FormContainer } from "react-hook-form-mui";
import { SchedulerFormFields } from "components/scheduler/scheduler-form-fields";
import { texts_n } from "services/localization/texts";
import { BntFormSubmit } from "shared/ui/form/bnt-form-submit";
import { defaultScheduler } from "components/scheduler/constants/default-scheduler";
import { useTimezone } from "shared/ui/form/hooks/use-timezone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSchedulerValidation } from "components/scheduler/use-scheduler-validation";
import { TSchedulerFormFields } from "components/scheduler/types/scheduler-form-fields";
import { schedulerFormToModel } from "components/scheduler/helper/scheduler-form-to-model";
import { secondsToTime } from "shared/lib/seconds-to-time";
import { TNewScheduler, TScheduler } from "@/types/model/scheduler";

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
