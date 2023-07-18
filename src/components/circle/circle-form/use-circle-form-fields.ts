import { TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";
import { TCircle } from "@/types/model";

export const useCircleFormFields = () => {
	const fields: Array<TFormField<TCircle>> = [
		{
			image: false,
			size: TFieldSize.xs,
			name: "name",
			label: "name",
			required: true,
			type: TFieldType.text,
		},
	];

	return { fields };
};
