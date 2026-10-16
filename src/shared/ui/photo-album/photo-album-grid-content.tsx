import type { TPhotoAlbumItem } from "./photo-album-grid.types";
import { PhotoAlbumGridItem } from "./photo-album-grid-item";
import { PhotoAlbumMasonry } from "./photo-album-masonry";

interface IPhotoAlbumGridContentProps {
	photoLabel: string;
	photos: Array<TPhotoAlbumItem>;

	onPhotoClick: (index: number) => void;
}

export function PhotoAlbumGridContent({ onPhotoClick, photoLabel, photos }: IPhotoAlbumGridContentProps) {
	return (
		<PhotoAlbumMasonry testId="photo-album-grid">
			{photos.map((photo, index) => (
				<PhotoAlbumGridItem key={photo.id ?? photo.originalUrl} index={index} photo={photo} photoLabel={photoLabel} onPhotoClick={onPhotoClick} />
			))}
		</PhotoAlbumMasonry>
	);
}
