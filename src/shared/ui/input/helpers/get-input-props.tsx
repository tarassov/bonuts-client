import type { ReactNode, SyntheticEvent } from "react";
import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

type TSupportedInputProps = {
	endAdornment?: ReactNode;
	[key: string]: unknown;
};

const getEndAdornment = (existingEndAdornment: ReactNode, clearable: boolean, onClear: VoidFunction, value: unknown) => {
	if (!clearable) return existingEndAdornment;
	if (!value) return existingEndAdornment;

	return (
		<>
			{existingEndAdornment}
			<InputAdornment position="end">
				<IconButton
					onClick={(e: SyntheticEvent) => {
						e.preventDefault();
						onClear();
					}}
				>
					<Close />
				</IconButton>
			</InputAdornment>
		</>
	);
};

export const getInputProps = (args: { clearable: boolean; value: unknown; onClear: VoidFunction; props: TSupportedInputProps }) => {
	const { props, onClear, value, clearable } = args;

	return {
		...props,
		endAdornment: getEndAdornment(props.endAdornment, clearable, onClear, value),
	};
};
