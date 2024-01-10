import { FC } from "react";
import { useForm } from "react-hook-form";
import { emptyFunction } from "utils/empty-function";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { FormContainer } from "react-hook-form-mui";
import { SchedulerFormFields } from "components/scheduler/scheduler-form-fields";
import { texts_n } from "services/localization/texts";
import { BntFormSubmit } from "shared/form/bnt-form-submit";
import { defaultScheduler } from "components/scheduler/constants/default-scheduler";
import { useTimezone } from "shared/form/hooks/use-timezone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSchedulerValidation } from "components/scheduler/use-scheduler-validation";
import { TSchedulerFormFields } from "components/scheduler/types/scheduler-form-fields";
import { schedulerFormToModel } from "components/scheduler/helper/scheduler-form-to-model";
import { TNewScheduler } from "@/types/model/scheduler";

export const SchedulerForm: FC<{
	onSubmit?: (scheduler: TNewScheduler) => void;
	onCancel: VoidFunction;
}> = ({ onSubmit = emptyFunction, onCancel = emptyFunction }) => {
	const { translate } = useBntTranslate();
	const { parseTimezone } = useTimezone();
	const { formSchema } = useSchedulerValidation();

	const formContext = useForm<TSchedulerFormFields>({
		shouldUseNativeValidation: false,
		resolver: yupResolver(formSchema),
		defaultValues: {
			...defaultScheduler,
			name: translate(texts_n.new_scheduler),
			timezoneValue: parseTimezone(defaultScheduler.timezone),
		},
	});

	const handleSubmit = (scheduler: TSchedulerFormFields) => {
		onSubmit(schedulerFormToModel(scheduler));
	};
	return (
		<FormContainer
			formContext={formContext}
			onSuccess={handleSubmit}
			onError={(e) => console.error(e)}
		>
			<SchedulerFormFields />
			<BntFormSubmit visible onCancelClick={onCancel} />
		</FormContainer>
	);
};
