import { FC, SyntheticEvent } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { EMPTY_FUNCTION } from "constants/functions";

/**
 *@param  props: clearable - if true show close icons in the of the string
 *
 * */
export const BntTextField: FC<
	TextFieldProps & { stringLabel?: string } & {
		clearable?: boolean;
		onClear?: () => void;
	}
> = (props) => {
	const { translate } = useBntTranslate();
	const { stringLabel, onClear = EMPTY_FUNCTION, clearable = false, ...rest } = props;

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
		<TextField
			{...rest}
			placeholder={translate(placeholder)}
			label={translate(stringLabel) || label}
			InputProps={inputProps}
		/>
	);
};
