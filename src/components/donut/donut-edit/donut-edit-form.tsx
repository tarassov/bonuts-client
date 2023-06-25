import { TFormProps, TFormValue } from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { FC } from "react";
import { useDonutEditFormFields } from "components/donut/donut-edit/hooks/use-donut-edit-form-fields";
import { TDonut } from "@/types/model";

export const DonutEditForm: FC<{
	donut: TDonut;
	onSubmit: (values: Record<string, TFormValue>) => void;
}> = ({ onSubmit, donut }) => {
	const { fields, groups } = useDonutEditFormFields();
	const formProps: TFormProps = { fields, formId: "edit-donut", groups, groupGap: 0 };

	const handleSubmit = (values: Record<string, TFormValue>) => {
		onSubmit(values);
	};

	return (
		<div className="p-8">
			<BntForm hasInitial {...formProps} onSubmit={handleSubmit} initialValues={donut} />
		</div>
	);
};
