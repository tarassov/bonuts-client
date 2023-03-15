import { TFieldType, TFormField } from "./types/bnt-form";
import { FC } from "react";
import { BntTextField } from "./fields/bnt-text-field";
import { useBntTranslate } from "../../hooks/use-bnt-translate";
import { BntTagAutocomplete } from "./fields/bnt-tag-autocomplete";
import { BntImageUpload } from "./fields/bnt-image-upload";

export const BntFormField: FC<{
	field: TFormField;
	value: any;
	formId: string;
	id: string;
}> = ({ field, value, formId, id }) => {
	const { translate } = useBntTranslate();
	if (field.type === TFieldType.tags) {
		return <BntTagAutocomplete id={id} field={field} value={value} />;
	} else if (field.type === TFieldType.imageUpload) {
		return <BntImageUpload id={id} field={field} value={value} />;
	}
	return (
		<BntTextField
			name={field.name}
			id={id}
			placeholder={translate(field.placeholder)}
			label={translate(field.label)}
			type={field.type}
			value={value}
			rows={field.rows}
			required={field.required}
			disabled={field.disabled}
		/>
	);
};
