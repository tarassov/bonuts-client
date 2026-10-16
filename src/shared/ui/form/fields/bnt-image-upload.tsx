import React, { useEffect, useState } from "react";

import _ from "lodash";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_d } from "services/localization/texts";

import { ImagePreview } from "@/shared/ui/image";

import { BntFormFileInput } from "../bnt-form-file-input";
import { useBntForm } from "../hooks/use-bnt-form";
import { TFormField, TFormImageValue, TFormValue } from "../types/bnt-form";

import { ImageUploadDropzone, ImageUploadPreview } from "./bnt-image-upload.styles";

export const BntImageUpload = (props: { field: TFormField<any>; value: TFormValue }) => {
	const { field, value } = props;
	const { name } = field;
	const { onChange } = useBntForm();
	const { translate } = useBntTranslate();
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
	useEffect(() => {
		if (value instanceof File) return;

		if (value) {
			const url = (value as TFormImageValue)?.url;
			setImagePreviewUrl(url || "");
		}
	}, [value]);

	const handleFile = (files: FileList) => {
		const reader = new FileReader();
		const file = files[0];

		reader.onloadend = () => {
			setImagePreviewUrl(reader.result as string);
		};

		reader.readAsDataURL(file);

		onChange(name.toString(), file);
		field.onImageChange?.(file);
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
				<ImageUploadPreview>
					<ImagePreview
						defaultImage={imagePreviewUrl}
						onClick={() => {
							if (!_.isEmpty(imagePreviewUrl)) field.onClick?.(imagePreviewUrl);
						}}
					/>
					<BntFormFileInput handleFileInputChange={handleFileInputChange} />
				</ImageUploadPreview>
			) : (
				<ImageUploadDropzone onDragOver={handleDragOver} onDrop={handleDrop}>
					<p>{translate(texts_d.drag_reward_image)}</p>
					<BntFormFileInput handleFileInputChange={handleFileInputChange} />
				</ImageUploadDropzone>
			)}
		</div>
	);
};
