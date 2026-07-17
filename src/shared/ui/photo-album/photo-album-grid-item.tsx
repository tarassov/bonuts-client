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

function getPhotoTileClassName(isFeatured: boolean, isLoading = false) {
	return classNames(styles.photoTile, {
		[styles.featuredTile]: isFeatured,
		[styles.loadingTile]: isLoading,
	});
}

export function PhotoAlbumGridItem({ index, isLoading = false, onPhotoClick, photo, photoLabel }: IPhotoAlbumGridItemProps) {
	const isFeatured = index === 0;

	if (isLoading) {
		return <div className={getPhotoTileClassName(isFeatured, true)} />;
	}

	if (!photo || !photoLabel || !onPhotoClick) {
		return null;
	}

	return (
		<button data-testid={`photo-album-tile-${index}`} type="button" className={getPhotoTileClassName(isFeatured)} onClick={() => onPhotoClick(index)}>
			<img className={styles.photoImage} src={photo.previewUrl} alt={`${photoLabel} ${index + 1}`} />
			<span className={styles.photoOverlay} />
		</button>
	);
}
