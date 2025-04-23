import {
	FilledInputProps,
	IconButton,
	InputAdornment,
	InputProps,
	OutlinedInputProps,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { Close } from "@mui/icons-material";

export const getInputProps = (args: {
	clearable: boolean;
	value: unknown;
	onClear: VoidFunction;
	props: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>;
}) => {
	const { props, onClear, value, clearable } = args;
	return {
		...props,
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
};
