import classNames from "classnames";

import type { TPhotoAlbumItem } from "./photo-album-grid.types";
import styles from "./photo-album-viewer.module.scss";

interface IPhotoAlbumViewerThumbnailsProps {
	activeIndex: number;
	onThumbnailClick: (index: number) => void;
	photoLabel: string;
	photos: Array<TPhotoAlbumItem>;
}

export function PhotoAlbumViewerThumbnails({ activeIndex, onThumbnailClick, photoLabel, photos }: IPhotoAlbumViewerThumbnailsProps) {
	return (
		<div className={styles.thumbnailRail} data-testid="photo-album-thumbnails">
			{photos.map((photo, index) => (
				<button
					key={`${photo.originalUrl}-${index}`}
					data-testid={`photo-album-thumbnail-${index}`}
					type="button"
					className={classNames(styles.thumbnailButton, {
						[styles.thumbnailButtonActive]: index === activeIndex,
					})}
					onClick={() => onThumbnailClick(index)}
				>
					<img className={styles.thumbnailImage} src={photo.previewUrl} alt={`${photoLabel} ${index + 1}`} />
				</button>
			))}
		</div>
	);
}
