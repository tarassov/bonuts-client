import { forwardRef } from "react";
import { FieldError, TextFieldElement } from "react-hook-form-mui";
import { TextFieldProps } from "@mui/material";

import { getInputProps } from "shared/ui/input/helpers/get-input-props";

import { EMPTY_FUNCTION } from "constants/functions";

import { useBntTranslate } from "hooks/use-bnt-translate";

/**
 *@param  props: clearable - if true show close icons in the of the string
 *
 * */
export const BntTextInputElement = forwardRef<
	HTMLDivElement,
	TextFieldProps & { stringLabel?: string; clearable?: boolean; onClear?: () => void; name: string }
>((props, ref) => {
	const { translate } = useBntTranslate();
	const { stringLabel, onClear = EMPTY_FUNCTION, name, clearable = false, component, ...rest } = props;

	const { InputProps = {}, value, placeholder, label } = rest;

	const inputProps = getInputProps({ clearable, onClear, value, props: InputProps });
	return (
		<TextFieldElement
			{...rest}
			component={component as any}
			ref={ref}
			name={name}
			placeholder={translate(placeholder)}
			label={translate(stringLabel) || label}
			InputProps={inputProps}
			value={value}
			parseError={(error: FieldError) => translate(error.message)}
			variant="standard"
		/>
	);
});
