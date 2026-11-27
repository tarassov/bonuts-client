import { useState } from "react";

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
	const [settledUrl, setSettledUrl] = useState<string>();

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

	const isDeferred = index >= 8 && !photo.uploadingLabel;
	const isPending = settledUrl !== photo.previewUrl;
	const tileClassName = classNames(styles.photoTile, { [styles.loadingTile]: isPending });
	const image = (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: Image lifecycle events release the reserved space.
		<img
			className={classNames(styles.photoImage, { [styles.pendingImage]: isPending })}
			src={photo.previewUrl}
			alt={`${photoLabel} ${index + 1}`}
			decoding="async"
			loading={isDeferred ? "lazy" : "eager"}
			onLoad={() => setSettledUrl(photo.previewUrl)}
			onError={() => setSettledUrl(photo.previewUrl)}
		/>
	);

	return (
		<div className={styles.albumItem}>
			{photo.uploadingLabel ? (
				<div className={tileClassName}>
					{image}
					<span className={styles.uploadStatus} role="status">
						{photo.uploadingLabel}
					</span>
				</div>
			) : (
				<button data-testid={`photo-album-tile-${index}`} type="button" className={tileClassName} onClick={() => onPhotoClick(index)}>
					{image}
				</button>
			)}
		</div>
	);
}
