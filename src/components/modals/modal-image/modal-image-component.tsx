import { FC } from "react";
import { MODAL_IMAGE_CLASSES } from "components/modals/modal-image/classes";

export const ModalImageComponent: FC<{ url: string; className?: string }> = ({
	url,
	className,
}) => {
	return (
		<div className={className}>
			<img className={MODAL_IMAGE_CLASSES.modalImage} src={url} alt="..." />
		</div>
	);
};
