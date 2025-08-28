import { FieldSize, FieldType, TFormField } from "shared/ui/form/types/bnt-form";

import { TCircle } from "@/types/model";

export const useCircleFormFields = () => {
	const fields: Array<TFormField<TCircle>> = [
		{
			image: false,
			size: FieldSize.xs,
			name: "name",
			label: "name",
			required: true,
			type: FieldType.text,
		},
	];

	return { fields };
};
