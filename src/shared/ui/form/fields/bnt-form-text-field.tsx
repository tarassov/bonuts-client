import { ChangeEvent } from "react";

import _ from "lodash";

import { BntTextInputElement } from "@/shared/ui/input";

import { useBntForm } from "../hooks/use-bnt-form";
import { FieldType, TFormValue } from "../types/bnt-form";

// TextFieldElement must store the same raw value as handleChange: react-hook-form drops
// the validation result of a change when the field value differs afterwards.
const RAW_INPUT_VALUE_TRANSFORM = {
	output: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => event.target.value,
};

export function BntFormTextField(props: {
	name: string;
	id?: string;
	placeholder: string | undefined;
	label?: string;
	helperText?: string;
	type: FieldType | undefined;
	value: TFormValue;
	rows?: number;
	maxValue?: number;
	minValue?: number;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
}) {
	const { name, id, minValue, maxValue, placeholder, readOnly, label, helperText, type, value, rows, required, disabled } = props;
	const { onChange } = useBntForm();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = _.isNumber(e.target.value) ? Number(e.target.value) : e.target.value;
		onChange(name, inputValue);
	};
	return (
		<BntTextInputElement
			name={name}
			id={id}
			placeholder={placeholder}
			stringLabel={label}
			helperText={helperText}
			type={type}
			value={value}
			multiline={type === FieldType.text}
			rows={rows}
			required={required}
			sx={{ width: "100%" }}
			disabled={disabled}
			onChange={handleChange}
			transform={RAW_INPUT_VALUE_TRANSFORM}
			InputProps={{ inputProps: { min: minValue, max: maxValue }, readOnly }}
		/>
	);
}
