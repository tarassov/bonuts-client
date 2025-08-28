import { ChangeEvent } from "react";
import _ from "lodash";

import { BntTextInputElement } from "shared/ui/input/text-input-element";

import { useBntForm } from "../hooks/use-bnt-form";
import { FieldType, TFormValue } from "../types/bnt-form";

export function BntFormTextField(props: {
	name: string;
	id?: string;
	placeholder: string | undefined;
	label?: string;
	type: FieldType | undefined;
	value: TFormValue;
	rows?: number;
	maxValue?: number;
	minValue?: number;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
}) {
	const { name, id, minValue, maxValue, placeholder, readOnly, label, type, value, rows, required, disabled } = props;
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
			type={type}
			value={value}
			multiline={type === FieldType.text}
			rows={rows}
			required={required}
			sx={{ width: "100%" }}
			disabled={disabled}
			onChange={handleChange}
			InputProps={{ inputProps: { min: minValue, max: maxValue }, readOnly }}
		/>
	);
}
