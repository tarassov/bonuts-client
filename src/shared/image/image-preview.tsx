import React, { FC, useState } from "react";
import { ImageContainer } from "./image-container";
import { CardMedia } from "@mui/material";

export const ImagePreview: FC<{
	image?: string | null;
	avatar?: string | null;
	defaultImage: string;
	className?: string;
}> = ({ image, avatar, defaultImage, className }) => {
	// const { showModal } = useModal(IMAGE_PREVIEW);

	const previewModal = () => {};

	return (
		<ImageContainer round={!!avatar} className={className}>
			<img src={image || avatar || defaultImage} alt="..." />
		</ImageContainer>
	);
};
