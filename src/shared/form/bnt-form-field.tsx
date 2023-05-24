import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TFieldType, TFormField } from "./types/bnt-form";
import { BntFormTextField } from "./fields/bnt-form-text-field";
import { BntTagAutocomplete } from "./fields/bnt-tag-autocomplete";
import { BntImageUpload } from "./fields/bnt-image-upload";

export const BntFormField: FC<{
	field: TFormField;
	value: any;
	id: string;
}> = ({ field, value, id }) => {
	const { translate } = useBntTranslate();

	if (field.type === TFieldType.tags) {
		return <BntTagAutocomplete id={id} field={field} value={value} />;
	}
	if (field.type === TFieldType.imageUpload) {
		return <BntImageUpload field={field} value={value} />;
	}
	return (
		<BntFormTextField
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
