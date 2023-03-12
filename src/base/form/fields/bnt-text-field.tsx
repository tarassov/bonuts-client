import { TFieldType, TFormValue } from "../types/bnt-form";
import { TextField } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import { BntFormContext } from "../context/bnt-form-context";
import { useBntForm } from "../hooks/use-bnt-form";

export function BntTextField(props: {
	name: string;
	id: string;
	placeholder: string | undefined;
	label: string;
	type: TFieldType | undefined;
	value: TFormValue;
	rows: number | undefined;
	required: boolean | undefined;
	disabled?: boolean;
}) {
	const { name } = props;
	const { onChange } = useBntForm();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(name, e.target.value);
	};
	return (
		<TextField
			name={props.name}
			id={props.id}
			placeholder={props.placeholder}
			label={props.label}
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
