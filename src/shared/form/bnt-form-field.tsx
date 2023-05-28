import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTextAreaField } from "shared/form/fields/bnt-text-area-field";
import { BntDatePickerField } from "shared/form/fields/bnt-date-picker-field";
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
	if (field.type === TFieldType.textarea) {
		return (
			<BntTextAreaField
				name={field.name}
				id={id}
				placeholder={field.placeholder}
				label={field.label}
				value={value}
				maxRows={field.maxRows}
				minRows={field.minRows}
				rows={field.rows}
				disabled={field.disabled}
				required={field.required}
			/>
		);
	}
	if (field.type === TFieldType.date) {
		return (
			<BntDatePickerField
				name={field.name}
				disabled={field.disabled}
				required={field.required}
				label={field.label}
			/>
		);
	}
	return (
		<>
			<BntFormTextField
				name={field.name}
				id={id}
				placeholder={translate(field.placeholder)}
				label={translate(field.label)}
				type={field.type}
				value={value}
				rows={field.rows}
				disabled={field.disabled}
				required={field.required}
			/>
		</>
	);
};
