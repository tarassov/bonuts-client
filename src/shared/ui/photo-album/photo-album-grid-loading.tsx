import styles from "./photo-album-grid.module.scss";
import { PhotoAlbumGridItem } from "./photo-album-grid-item";

const loadingTiles = Array.from({ length: 5 }, (_, index) => index);

export function PhotoAlbumGridLoading() {
	return (
		<div className={styles.albumGrid} aria-hidden data-testid="photo-album-grid-loading">
			{loadingTiles.map((tileIndex) => (
				<PhotoAlbumGridItem key={tileIndex} index={tileIndex} isLoading />
			))}
		</div>
	);
}
