import { FC } from "react";

import { useCreateDonutFormFields } from "components/donut/donut-create-form/hooks/use-create-donut-form-fields";
import { BntForm } from "shared/ui/form/bnt-form";
import { TFormProps, TFormValue } from "shared/ui/form/types/bnt-form";

import { TPostDonutArgs } from "@/entities/donut";

import { TDonut } from "@/types/model";

export function DonutCreateForm({ onSubmit }: { onSubmit: (values: TPostDonutArgs) => void }) {
	const { fields, groups } = useCreateDonutFormFields();
	const formProps: TFormProps<TPostDonutArgs> = { fields, formId: "create-donut", groups, groupGap: 0 };

	const handleSubmit = (values: TPostDonutArgs) => {
		onSubmit(values);
	};

	return <BntForm {...formProps} onSubmit={handleSubmit} />;
}
