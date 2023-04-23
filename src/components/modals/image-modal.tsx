import { FC } from "react";

export const ImageModal: FC<{ url: string }> = ({ url }) => {
	return (
		<div>
			<img src={url} alt="..." />
		</div>
	);
};
