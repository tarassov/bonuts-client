import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useBntTranslate } from "../../hooks/use-bnt-translate";

export const BntTextField: FC<TextFieldProps & { stringLabel?: string }> = (
	props
) => {
	const { translate } = useBntTranslate();
	return (
		<TextField
			{...props}
			placeholder={translate(props.placeholder)}
			label={translate(props.stringLabel) || props.label}
		/>
	);
};
