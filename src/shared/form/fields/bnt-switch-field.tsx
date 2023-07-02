import { SyntheticEvent } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { FormControlLabel, Switch } from "@mui/material";
import { TFormValue } from "../types/bnt-form";
import { useBntForm } from "../hooks/use-bnt-form";

export const BntSwitchField = (props: {
	name: string;
	id?: string;
	label?: string;
	value: TFormValue;
	disabled?: boolean;
}) => {
	const { name, id, label, value, disabled } = props;
	const { onChange } = useBntForm();
	const { t } = useBntTranslate();
	const handleChange = (e: SyntheticEvent, checked: boolean) => {
		onChange(name, checked);
	};
	return (
		<FormControlLabel
			control={
				<Switch
					checked={Boolean(value)}
					onChange={handleChange}
					name={name}
					id={id}
					disabled={disabled}
				/>
			}
			label={t(label)}
		/>
	);
};
