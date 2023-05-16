import { Stack } from "@mui/material";
import React, { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { Dictionary } from "constants/dictionary";
import { BntTransparentButton } from "../buttons/transparent-button";

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
