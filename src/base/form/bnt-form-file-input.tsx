import { Button, Stack } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import React, { FC } from "react";
import { BntTransparentButton } from "../buttons/transparent-button";
import { useBntTranslate } from "../../hooks/useBntTranslate";
import { Dictionary } from "../../constants/dictionary";

export const BntFormFileInput: FC<{
	handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleFileInputChange }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const { translate } = useBntTranslate();

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing={2}
		>
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
			<label htmlFor="raised-button-file">
				<BntTransparentButton
					sx={{ component: "span" }}
					variant="text"
					color="primary"
					onClick={handleButtonClick}
				>
					{translate(Dictionary.EDIT)}
				</BntTransparentButton>
			</label>
		</Stack>
	);
};
