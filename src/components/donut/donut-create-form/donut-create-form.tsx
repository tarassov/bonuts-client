import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { useCreateDonutFormFields } from "components/donut/donut-create-form/hooks/use-create-donut-form-fields";
import { FC } from "react";
import { TDonut } from "@/types/model";

export const DonutCreateForm: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
}> = ({ onSubmit }) => {
	const { fields, groups } = useCreateDonutFormFields();
	const formProps: TFormProps<TDonut> = { fields, formId: "create-donut", groups, groupGap: 0 };

	const handleSubmit = (values: Record<string, TFormValue>) => {
		onSubmit(values);
	};

	return <BntForm {...formProps} onSubmit={handleSubmit} />;
};
