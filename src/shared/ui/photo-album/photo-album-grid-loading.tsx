import { PhotoAlbumGridItem } from "./photo-album-grid-item";
import { PhotoAlbumMasonry } from "./photo-album-masonry";

const loadingTiles = Array.from({ length: 5 }, (_, index) => index);

export function PhotoAlbumGridLoading() {
	return (
		<PhotoAlbumMasonry ariaHidden testId="photo-album-grid-loading">
			{loadingTiles.map((tileIndex) => (
				<PhotoAlbumGridItem key={tileIndex} index={tileIndex} isLoading />
			))}
		</PhotoAlbumMasonry>
	);
}
