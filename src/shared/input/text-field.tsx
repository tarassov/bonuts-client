import { FC, SyntheticEvent } from "react";
import {
	IconButton,
	InputAdornment,
	TextField,
	TextFieldProps,
} from "@mui/material";
import { useBntTranslate } from "../../hooks/use-bnt-translate";
import { Close } from "@mui/icons-material";
import { EMPTY_FUNCTION } from "../../constants/functions";

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

	const {
		InputProps = {},
		clearable = false,
		onClear = EMPTY_FUNCTION,
		value,
	} = props;

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
			{...props}
			placeholder={translate(props.placeholder)}
			label={translate(props.stringLabel) || props.label}
			InputProps={inputProps}
		/>
	);
};
