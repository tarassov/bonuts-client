import React, { FC, useState } from "react";
import { ImageContainer } from "./image-container";
import { CardMedia } from "@mui/material";

export const ImagePreview: FC<{
	image?: string | null;
	avatar?: string | null;
	defaultImage: string;
}> = ({ image, avatar, defaultImage }) => {
	// const { showModal } = useModal(IMAGE_PREVIEW);

	const previewModal = () => {};

	return (
		<ImageContainer round={!!avatar}>
			<img src={image || avatar || defaultImage} alt="..." />
		</ImageContainer>
	);
};
