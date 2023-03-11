import { TFieldType } from "../../types/bnt-form";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

export function BntTextField(props: {
	name: string;
	id: string;
	placeholder: string | undefined;
	label: string;
	type: TFieldType | undefined;
	value: any;
	onChange: (e: ChangeEvent<any>) => void;
	rows: number | undefined;
	required: boolean | undefined;
}) {
	return (
		<TextField
			name={props.name}
			id={props.id}
			placeholder={props.placeholder}
			label={props.label}
			type={props.type}
			value={props.value}
			onChange={props.onChange}
			multiline={props.type !== TFieldType.password}
			rows={props.rows}
			required={props.required}
			sx={{ width: "100%" }}
		/>
	);
}
