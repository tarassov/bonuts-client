import { TFormProps } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { useCreateDonutFormFields } from "components/donut/donut-create-form/hooks/use-create-donut-form-fields";

export const DonutCreateForm = () => {
	const { fields } = useCreateDonutFormFields();
	const formProps: TFormProps = { fields, formId: "create-donut" };

	const onSubmit = (values: any) => {
		return Promise.resolve(values);
	};

	return <BntForm {...formProps} onSubmit={onSubmit} />;
};
