import { Box, CardMedia } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import React, { useEffect, useState } from "react";
import { TFormField, TFormImageValue, TFormValue } from "../types/bnt-form";

import { useBntForm } from "../hooks/use-bnt-form";
import { BntFormFileInput } from "../bnt-form-file-input";

export const BntImageUpload = (props: { field: TFormField; value: TFormValue }) => {
	const { field, value } = props;
	const { name } = field;
	const { onChange } = useBntForm();
	const { translate } = useBntTranslate();
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
	useEffect(() => {
		const url = (value as TFormImageValue)?.url;
		setImagePreviewUrl(url || "");
	}, [value]);

	const handleFile = (files: FileList) => {
		const reader = new FileReader();
		const file = files[0];

		reader.onloadend = () => {
			setImagePreviewUrl(reader.result as string);
		};

		reader.readAsDataURL(file);
		onChange(name, file);
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (e.target.files && e.target.files.length > 0) {
			handleFile(e.target.files);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFile(e.dataTransfer.files);
		}
	};

	return (
		<div>
			{imagePreviewUrl ? (
				<>
					<CardMedia
						component="img"
						sx={{ objectFit: "contain", maxHeight: "300px" }}
						image={imagePreviewUrl}
						title="Selected Image"
					/>
					<BntFormFileInput handleFileInputChange={handleFileInputChange} />
				</>
			) : (
				<Box
					sx={{
						border: "dashed 2px #aaa",
						borderRadius: 5,
						cursor: "pointer",
						padding: "1em",
						textAlign: "center",
					}}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<p>{translate("Drag and drop an image here or click to select a file")}</p>
					<BntFormFileInput handleFileInputChange={handleFileInputChange} />
				</Box>
			)}
		</div>
	);
};
