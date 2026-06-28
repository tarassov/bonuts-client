import { PhotoLibraryOutlined } from "@mui/icons-material";

import { BntTypography } from "@/shared/ui/typography";

import styles from "./photo-album-grid.module.scss";

export type TPhotoAlbumItem = {
	id?: number;
	userId?: number;
	previewUrl: string;
	originalUrl: string;
};

interface IPhotoAlbumGridProps {
	photos: Array<TPhotoAlbumItem>;
	emptyText: string;
	isLoading?: boolean;
	onPhotoClick: (index: number) => void;
	photoLabel: string;
}

const loadingTiles = Array.from({ length: 5 }, (_, index) => index);

export function PhotoAlbumGrid({ photos, emptyText, isLoading = false, onPhotoClick, photoLabel }: IPhotoAlbumGridProps) {
	if (isLoading && photos.length === 0) {
		return (
			<div className={styles.albumGrid} aria-hidden data-testid="photo-album-grid-loading">
				{loadingTiles.map((tileIndex) => (
					<div key={tileIndex} className={`${styles.photoTile} ${tileIndex === 0 ? styles.featuredTile : ""} ${styles.loadingTile}`} />
				))}
			</div>
		);
	}

	if (photos.length === 0) {
		return (
			<div className={styles.emptyState} data-testid="photo-album-grid-empty">
				<div className={styles.emptyIconWrap}>
					<PhotoLibraryOutlined />
				</div>
				<BntTypography variant="body1">{emptyText}</BntTypography>
			</div>
		);
	}

	return (
		<div className={styles.albumGrid} data-testid="photo-album-grid">
			{photos.map((photo, index) => (
				<button
					key={`${photo.originalUrl}-${index}`}
					data-testid={`photo-album-tile-${index}`}
					type="button"
					className={`${styles.photoTile} ${index === 0 ? styles.featuredTile : ""}`}
					onClick={() => onPhotoClick(index)}
				>
					<img className={styles.photoImage} src={photo.previewUrl} alt={`${photoLabel} ${index + 1}`} />
					<span className={styles.photoOverlay} />
				</button>
			))}
		</div>
	);
}
