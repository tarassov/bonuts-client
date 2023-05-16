import React, { FC } from "react";
import { ImageContainer } from "./image-container";

export const ImagePreview: FC<{
	image?: string | null;
	avatar?: string | null;
	defaultImage: string;
	className?: string;
	onClick?: () => void;
}> = ({ image, avatar, defaultImage, className, onClick = () => {} }) => {
	// const { showModal } = useModal(IMAGE_PREVIEW);

	// const previewModal = () => {};

	return (
		<ImageContainer round={!!avatar} className={className} onClick={onClick}>
			<img src={image || avatar || defaultImage} alt="..." />
		</ImageContainer>
	);
};
