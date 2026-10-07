import classNames from "classnames";

import styles from "./event-images.module.scss";
import type { TEventImage } from "@/types/model/event";

interface IEventImagesProps {
	images?: Array<TEventImage>;
	imageLabel: string;
}

type TRenderableEventImage = {
	originalUrl: string;
	previewUrl: string;
};

function toRenderableImage(image: TEventImage): TRenderableEventImage | undefined {
	const originalUrl = image.url;

	if (!originalUrl) {
		return undefined;
	}

	return { originalUrl, previewUrl: originalUrl };
}

export function EventImages({ images = [], imageLabel }: IEventImagesProps) {
	const renderableImages = images.map(toRenderableImage).filter((image): image is TRenderableEventImage => Boolean(image));

	if (renderableImages.length === 0) {
		return null;
	}

	return (
		<div className={classNames(styles.gallery, { [styles.singleImageGallery]: renderableImages.length === 1 })} data-testid="event-images">
			{renderableImages.map((image, index) => (
				<a key={`${image.originalUrl}-${index}`} className={styles.imageLink} href={image.originalUrl} target="_blank" rel="noopener noreferrer">
					<img className={styles.image} src={image.previewUrl} alt={`${imageLabel} ${index + 1}`} loading="lazy" decoding="async" />
				</a>
			))}
		</div>
	);
}
