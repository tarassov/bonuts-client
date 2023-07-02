import { ChangeEvent } from "react";
import _ from "lodash";
import { TFieldType, TFormValue } from "../types/bnt-form";
import { useBntForm } from "../hooks/use-bnt-form";
import { BntTextInputElement } from "../../input/text-input-element";

export const BntFormTextField = (props: {
	name: string;
	id?: string;
	placeholder: string | undefined;
	label?: string;
	type: TFieldType | undefined;
	value: TFormValue;
	rows?: number;
	disabled?: boolean;
	required?: boolean;
}) => {
	const { name, id, placeholder, label, type, value, rows, required, disabled } = props;
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
			multiline={type === TFieldType.text}
			rows={rows}
			required={required}
			sx={{ width: "100%" }}
			disabled={disabled}
			onChange={handleChange}
		/>
	);
};
