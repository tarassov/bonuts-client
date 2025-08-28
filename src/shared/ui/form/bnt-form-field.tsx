import { useWatch } from "react-hook-form";

import { BntDatePickerField } from "shared/ui/form/fields/bnt-date-picker-field";
import { BntRadioField } from "shared/ui/form/fields/bnt-radio-field";
import { BntSwitchField } from "shared/ui/form/fields/bnt-switch-field";
import { BntTextAreaField } from "shared/ui/form/fields/bnt-text-area-field";

import { BntFormTextField } from "./fields/bnt-form-text-field";
import { BntImageUpload } from "./fields/bnt-image-upload";
import { BntTagAutocomplete } from "./fields/bnt-tag-autocomplete";
import { FieldType, TFormField } from "./types/bnt-form";

interface IBntFormFieldProps {
	field: TFormField<any>;
	id: string;
}

export function BntFormField({ field, id }: IBntFormFieldProps) {
	const value = useWatch({ name: field.name.toString() });
	if (field.type === FieldType.tags) {
		return <BntTagAutocomplete id={id} field={field} value={value} />;
	}
	if (field.type === FieldType.imageUpload) {
		return <BntImageUpload field={field} value={value} />;
	}
	if (field.type === FieldType.textarea) {
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
	if (field.type === FieldType.date) {
		return (
			<BntDatePickerField
				name={field.name.toString()}
				disabled={field.disabled}
				required={field.required}
				label={field.label}
			/>
		);
	}
	if (field.type === FieldType.switch) {
		return (
			<BntSwitchField
				name={field.name.toString()}
				disabled={field.disabled}
				label={field.label}
				disabledLabel={field.disabledLabel}
			/>
		);
	}
	if (field.type === FieldType.radio) {
		return <BntRadioField field={field} />;
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
				readOnly={field.readOnly}
				required={field.required}
				maxValue={field.maxValue}
				minValue={field.minValue}
			/>
		</>
	);
}
