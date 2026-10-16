import classNames from "classnames";

import styles from "./photo-album-grid.module.scss";
import type { TPhotoAlbumItem } from "./photo-album-grid.types";

interface IPhotoAlbumGridItemProps {
	index: number;
	isLoading?: boolean;
	onPhotoClick?: (index: number) => void;
	photo?: TPhotoAlbumItem;
	photoLabel?: string;
}

export function PhotoAlbumGridItem({ index, isLoading = false, onPhotoClick, photo, photoLabel }: IPhotoAlbumGridItemProps) {
	if (isLoading) {
		return (
			<div className={styles.albumItem}>
				<div className={classNames(styles.photoTile, styles.loadingTile)} />
			</div>
		);
	}

	if (!photo || !photoLabel || !onPhotoClick) {
		return null;
	}

	return (
		<div className={styles.albumItem}>
			<button data-testid={`photo-album-tile-${index}`} type="button" className={styles.photoTile} onClick={() => onPhotoClick(index)}>
				<img className={styles.photoImage} src={photo.previewUrl} alt={`${photoLabel} ${index + 1}`} decoding="async" />
				<span className={styles.photoOverlay} />
			</button>
		</div>
	);
}
