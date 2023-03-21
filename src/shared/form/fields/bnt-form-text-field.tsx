import { TFieldType, TFormValue } from "../types/bnt-form";
import { ChangeEvent } from "react";
import { useBntForm } from "../hooks/use-bnt-form";
import { useBntTranslate } from "../../../hooks/use-bnt-translate";
import { BntTextField } from "../../input/text-field";

export function BntFormTextField(props: {
	name: string;
	id?: string;
	placeholder: string | undefined;
	label?: string;
	type: TFieldType | undefined;
	value: TFormValue;
	rows?: number;
	required?: boolean;
	disabled?: boolean;
}) {
	const { name } = props;
	const { onChange } = useBntForm();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(name, e.target.value);
	};
	return (
		<BntTextField
			name={props.name}
			id={props.id}
			placeholder={props.placeholder}
			stringLabel={props.label}
			type={props.type}
			value={props.value}
			onChange={handleChange}
			multiline={props.type !== TFieldType.password}
			rows={props.rows}
			required={props.required}
			sx={{ width: "100%" }}
			disabled={props.disabled}
		/>
	);
}
