import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { EMPTY_FUNCTION } from "constants/functions";
import { getInputProps } from "shared/input/helpers/get-input-props";

/**
 *@param  props: clearable - if true show close icons in the of the string
 *
 * */
export const BntTextInput: FC<
	TextFieldProps & {
		stringLabel?: string;
		clearable?: boolean;
		onClear?: () => void;
		name?: string;
		shouldTranslate?: boolean;
	}
> = (props) => {
	const { translate } = useBntTranslate();
	const {
		stringLabel,
		onClear = EMPTY_FUNCTION,
		name,
		clearable = false,
		shouldTranslate = true,
		...rest
	} = props;

	const { InputProps = {}, value, placeholder, label } = rest;

	const inputProps = getInputProps({ clearable, onClear, value, props: InputProps });
	return (
		<TextField
			{...rest}
			name={name}
			placeholder={shouldTranslate ? translate(placeholder) : placeholder}
			label={shouldTranslate ? translate(stringLabel) || label : stringLabel || label}
			InputProps={inputProps}
			value={value}
		/>
	);
};
