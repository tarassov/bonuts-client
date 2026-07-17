import styles from "./photo-album-grid.module.scss";
import type { TPhotoAlbumItem } from "./photo-album-grid.types";
import { PhotoAlbumGridItem } from "./photo-album-grid-item";

interface IPhotoAlbumGridContentProps {
	photoLabel: string;
	photos: Array<TPhotoAlbumItem>;

	onPhotoClick: (index: number) => void;
}

export function PhotoAlbumGridContent({ onPhotoClick, photoLabel, photos }: IPhotoAlbumGridContentProps) {
	return (
		<div className={styles.albumGrid} data-testid="photo-album-grid">
			{photos.map((photo, index) => (
				<PhotoAlbumGridItem key={`${photo.originalUrl}-${index}`} index={index} photo={photo} photoLabel={photoLabel} onPhotoClick={onPhotoClick} />
			))}
		</div>
	);
}
