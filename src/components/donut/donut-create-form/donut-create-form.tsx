import { TFormProps, TFormValue } from "shared/ui/form/types/bnt-form";
import { BntForm } from "shared/ui/form/bnt-form";
import { useCreateDonutFormFields } from "components/donut/donut-create-form/hooks/use-create-donut-form-fields";
import { FC } from "react";
import { TDonut } from "@/types/model";
import { TPostDonutArgs } from "@/entities/donut";

export function DonutCreateForm({ onSubmit }: { onSubmit: (values: TPostDonutArgs) => void }) {
	const { fields, groups } = useCreateDonutFormFields();
	const formProps: TFormProps<TPostDonutArgs> = { fields, formId: "create-donut", groups, groupGap: 0 };

	const handleSubmit = (values: TPostDonutArgs) => {
		onSubmit(values);
	};

	return <BntForm {...formProps} onSubmit={handleSubmit} />;
}
