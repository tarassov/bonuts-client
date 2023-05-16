import { ChangeEvent } from "react";
import { TFieldType, TFormValue } from "../types/bnt-form";
import { useBntForm } from "../hooks/use-bnt-form";
import { BntTextField } from "../../input/text-field";

export const BntFormTextField = (props: {
	name: string;
	id?: string;
	placeholder: string | undefined;
	label?: string;
	type: TFieldType | undefined;
	value: TFormValue;
	rows?: number;
	required?: boolean;
	disabled?: boolean;
}) => {
	const {
		name,
		id,
		placeholder,
		label,
		type,
		value,
		rows,
		required,
		disabled,
	} = props;
	const { onChange } = useBntForm();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(name, e.target.value);
	};
	return (
		<BntTextField
			name={name}
			id={id}
			placeholder={placeholder}
			stringLabel={label}
			type={type}
			value={value}
			onChange={handleChange}
			multiline={type !== TFieldType.password}
			rows={rows}
			required={required}
			sx={{ width: "100%" }}
			disabled={disabled}
		/>
	);
};
