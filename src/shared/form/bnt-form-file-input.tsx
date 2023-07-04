import { Box, Stack } from "@mui/material";
import React, { FC } from "react";
import { Dictionary } from "constants/dictionary";
import { BntIconButton } from "shared/icon-button/bnt-icon-button";
import { ModeEditOutlineRounded } from "@mui/icons-material";

export const BntFormFileInput: FC<{
	handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleFileInputChange }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
			<input
				accept="image/*"
				style={{ display: "none" }}
				id="raised-button-file"
				name="uploaded_file"
				multiple
				type="file"
				ref={inputRef}
				onChange={handleFileInputChange}
			/>
			<Box sx={{ textAlign: "center", width: "100%" }} className="pr-8">
				<BntIconButton onClick={handleButtonClick} tooltip={Dictionary.EDIT}>
					<ModeEditOutlineRounded />
				</BntIconButton>
			</Box>
		</Stack>
	);
};
