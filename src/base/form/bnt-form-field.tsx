import { TFieldType, TFormField } from "../types/bnt-form";
import { TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { BntTextField } from "./fields/bnt-text-field";

export const BntFormField: FC<{
	field: TFormField;
	value: any;
	formId: string;
	onChange: (e: ChangeEvent<any>) => void;
	id: string;
}> = ({ field, value, formId, onChange, id }) => {
	return (
		<BntTextField
			name={field.name}
			id={id}
			placeholder={field.placeholder}
			label={field.label}
			type={field.type}
			value={value}
			onChange={onChange}
			rows={field.rows}
			required={field.required}
		/>
	);
};
