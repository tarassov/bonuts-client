import React, { FC } from "react";
import { useModal } from "hooks/use-modal";
import { ImageContainer } from "./image-container";

export const ImagePreview: FC<{
	image?: string | null;
	avatar?: string | null;
	defaultImage: string;
	className?: string;
	onClick?: () => void;
}> = ({ image, avatar, defaultImage, className, onClick }) => {
	const { ImageModal } = useModal();
	const url = image || avatar || defaultImage;
	const previewModal = () => {
		ImageModal.show({ url });
	};

	return (
		<ImageContainer round={!!avatar} className={className} onClick={onClick || previewModal}>
			<img src={url} alt="..." />
		</ImageContainer>
	);
};
