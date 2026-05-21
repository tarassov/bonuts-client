import { forwardRef } from "react";
import { FieldError, TextFieldElement } from "react-hook-form-mui";
import { TextFieldProps } from "@mui/material";

import { EMPTY_FUNCTION } from "constants/functions";
import { useBntTranslate } from "hooks/use-bnt-translate";

import { getInputProps } from "./helpers/get-input-props";

/**
 *@param  props: clearable - if true show close icons in the of the string
 *
 * */
export const BntTextInputElement = forwardRef<HTMLDivElement, TextFieldProps & { stringLabel?: string; clearable?: boolean; onClear?: () => void; name: string }>((props, ref) => {
	const { translate } = useBntTranslate();
	const { stringLabel, onClear = EMPTY_FUNCTION, name, clearable = false, component, ...rest } = props;
	const { InputProps = {}, slotProps, value, placeholder, label } = rest;
	const resolvedInputProps = {
		...InputProps,
		...(slotProps?.input || {}),
	};
	const inputProps = getInputProps({ clearable, onClear, value, props: resolvedInputProps });

	return (
		<TextFieldElement
			{...rest}
			component={component as any}
			ref={ref}
			slotProps={{
				...slotProps,
				input: slotProps?.input ? inputProps : slotProps?.input,
			}}
			name={name}
			placeholder={translate(placeholder)}
			label={translate(stringLabel) || label}
			InputProps={slotProps?.input ? InputProps : inputProps}
			InputLabelProps={{ shrink: true, ...rest.InputLabelProps }}
			value={value}
			parseError={(error: FieldError) => translate(error.message)}
			variant="standard"
		/>
	);
});
