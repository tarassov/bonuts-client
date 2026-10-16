import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";

import { EMPTY_FUNCTION } from "constants/functions";
import { useBntTranslate } from "hooks/use-bnt-translate";

import { getInputProps } from "./helpers/get-input-props";

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
	const { stringLabel, onClear = EMPTY_FUNCTION, name, clearable = false, shouldTranslate = true, ...rest } = props;
	const { InputProps = {}, slotProps, value, placeholder, label } = rest;
	const resolvedInputProps = {
		...InputProps,
		...(slotProps?.input || {}),
	};
	const inputProps = getInputProps({ clearable, onClear, value, props: resolvedInputProps });

	return (
		<TextField
			{...rest}
			slotProps={{
				...slotProps,
				input: slotProps?.input ? inputProps : slotProps?.input,
			}}
			name={name}
			placeholder={shouldTranslate ? translate(placeholder) : placeholder}
			label={shouldTranslate ? translate(stringLabel) || label : stringLabel || label}
			InputProps={slotProps?.input ? InputProps : inputProps}
			InputLabelProps={{ shrink: true, ...rest.InputLabelProps }}
			value={value}
			variant="standard"
		/>
	);
};
