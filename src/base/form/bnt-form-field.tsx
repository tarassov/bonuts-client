import { TFieldType, TFormField, TFormValue } from "./types/bnt-form";
import { ChangeEvent, FC } from "react";
import { BntTextField } from "./fields/bnt-text-field";
import { useBntTranslate } from "../../hooks/useBntTranslate";
import { BntTagAutocomplete } from "./fields/bnt-tag-autocomplete";

export const BntFormField: FC<{
	field: TFormField;
	value: any;
	formId: string;
	id: string;
}> = ({ field, value, formId, id }) => {
	const { translate } = useBntTranslate();
	if (field.type === TFieldType.tags) {
		return <BntTagAutocomplete id={id} field={field} value={value} />;
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
