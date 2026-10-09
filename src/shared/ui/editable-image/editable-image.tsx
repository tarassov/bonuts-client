import { type ChangeEvent, useEffect, useRef, useState } from "react";

import { hasOperationError } from "@/shared/lib/type-guards";

import { EditableImageButton, EditableImageFallback, EditableImageOverlay, EditableImagePreview } from "./editable-image.styles";

interface IEditableImageProps {
	alt: string;
	fallback: string;
	imageUrl?: string | null;
	isLoading?: boolean;
	label: string;
	onChange: (file: File) => Promise<unknown> | unknown;
}

export function EditableImage({ alt, fallback, imageUrl, isLoading = false, label, onChange }: IEditableImageProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [previewUrl, setPreviewUrl] = useState("");

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		const nextPreviewUrl = URL.createObjectURL(file);

		setPreviewUrl(nextPreviewUrl);
		event.target.value = "";

		try {
			const result = await onChange(file);

			if (hasOperationError(result)) {
				setPreviewUrl("");
			}
		} catch {
			setPreviewUrl("");
		}
	};

	const currentImageUrl = previewUrl || imageUrl;

	return (
		<>
			<EditableImageButton type="button" aria-label={label} disabled={isLoading} onClick={handleClick}>
				{currentImageUrl ? <EditableImagePreview src={currentImageUrl} alt={alt} /> : <EditableImageFallback>{fallback}</EditableImageFallback>}
				<EditableImageOverlay>{label}</EditableImageOverlay>
			</EditableImageButton>
			<input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
		</>
	);
}
