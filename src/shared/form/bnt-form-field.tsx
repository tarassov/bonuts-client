import { FC } from "react";
import { BntTextAreaField } from "shared/form/fields/bnt-text-area-field";
import { BntDatePickerField } from "shared/form/fields/bnt-date-picker-field";
import { BntSwitchField } from "shared/form/fields/bnt-switch-field";
import { useWatch } from "react-hook-form";
import { TFieldType, TFormField } from "./types/bnt-form";
import { BntFormTextField } from "./fields/bnt-form-text-field";
import { BntTagAutocomplete } from "./fields/bnt-tag-autocomplete";
import { BntImageUpload } from "./fields/bnt-image-upload";

export const BntFormField: FC<{
	field: TFormField<any>;
	id: string;
}> = ({ field, id }) => {
	const value = useWatch({ name: field.name.toString() });
	if (field.type === TFieldType.tags) {
		return <BntTagAutocomplete id={id} field={field} value={value} />;
	}
	if (field.type === TFieldType.imageUpload) {
		return <BntImageUpload field={field} value={value} />;
	}
	if (field.type === TFieldType.textarea) {
		return (
			<BntTextAreaField
				name={field.name.toString()}
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
				name={field.name.toString()}
				disabled={field.disabled}
				required={field.required}
				label={field.label}
			/>
		);
	}
	if (field.type === TFieldType.switch) {
		return (
			<BntSwitchField
				name={field.name.toString()}
				disabled={field.disabled}
				label={field.label}
				disabledLabel={field.disabledLabel}
			/>
		);
	}
	return (
		<>
			<BntFormTextField
				name={field.name.toString()}
				id={id}
				placeholder={field.placeholder}
				label={field.label}
				type={field.type}
				value={value}
				rows={field.rows}
				disabled={field.disabled}
				required={field.required}
			/>
		</>
	);
};
