import { FC, SyntheticEvent } from "react";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { EMPTY_FUNCTION } from "constants/functions";
import { FieldError, TextFieldElement } from "react-hook-form-mui";

/**
 *@param  props: clearable - if true show close icons in the of the string
 *
 * */
export const BntTextInput: FC<
	TextFieldProps & { stringLabel?: string; clearable?: boolean; onClear?: () => void; name: string }
> = (props) => {
	const { translate } = useBntTranslate();
	const { stringLabel, onClear = EMPTY_FUNCTION, name, clearable = false, ...rest } = props;

	const { InputProps = {}, value, placeholder, label } = rest;

	const inputProps = {
		...InputProps,
		...(clearable && {
			endAdornment: (
				<InputAdornment position="end">
					{!!value && (
						<IconButton
							onClick={(e: SyntheticEvent) => {
								e.preventDefault();
								onClear();
							}}
						>
							<Close />
						</IconButton>
					)}
				</InputAdornment>
			),
		}),
	};

	return (
		<TextFieldElement
			{...rest}
			name={name}
			placeholder={translate(placeholder)}
			label={translate(stringLabel) || label}
			InputProps={inputProps}
			value={value}
			parseError={(error: FieldError) => translate(error.message)}
		/>
	);
};
