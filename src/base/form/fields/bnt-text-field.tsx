import { TFieldType, TFormValue } from "../types/bnt-form";
import { TextField } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import { BntFormProvider } from "../context/bnt-form-provider";
import { useBntForm } from "../hooks/use-bnt-form";
import { useBntTranslate } from "../../../hooks/use-bnt-translate";

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
	const { translate } = useBntTranslate();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(name, e.target.value);
	};
	return (
		<TextField
			name={props.name}
			id={props.id}
			placeholder={translate(props.placeholder)}
			label={translate(props.label)}
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
