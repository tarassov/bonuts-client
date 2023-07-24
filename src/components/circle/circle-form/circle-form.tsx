import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { FC } from "react";
import { useCircleFormFields } from "components/circle/circle-form/use-circle-form-fields";
import { TCircle, TDonut } from "@/types/model";

export const CircleForm: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
	hasInitial?: boolean;
	circle?: TCircle;
}> = ({ onSubmit, hasInitial = false, circle }) => {
	const { fields } = useCircleFormFields();

	const formProps: TFormProps<TDonut> = { fields, formId: "create-circle", groupGap: 0 };

	const handleSubmit = (values: Record<string, TFormValue>) => {
		onSubmit(values);
	};

	return (
		<BntForm
			{...formProps}
			onSubmit={handleSubmit}
			initialValues={circle}
			hasInitial={hasInitial}
		/>
	);
};
