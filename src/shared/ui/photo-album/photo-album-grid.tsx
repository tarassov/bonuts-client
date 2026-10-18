import type { TPhotoAlbumItem } from "./photo-album-grid.types";
import { PhotoAlbumGridContent } from "./photo-album-grid-content";
import { PhotoAlbumGridEmpty } from "./photo-album-grid-empty";
import { PhotoAlbumGridLoading } from "./photo-album-grid-loading";

interface IPhotoAlbumGridProps {
	photos: Array<TPhotoAlbumItem>;
	emptyText: string;
	isLoading?: boolean;
	onPhotoClick: (index: number) => void;
	photoLabel: string;
}

export function PhotoAlbumGrid({ photos, emptyText, isLoading = false, onPhotoClick, photoLabel }: IPhotoAlbumGridProps) {
	if (isLoading && photos.length === 0) {
		return <PhotoAlbumGridLoading />;
	}

	if (photos.length === 0) {
		return <PhotoAlbumGridEmpty emptyText={emptyText} />;
	}

	return <PhotoAlbumGridContent photos={photos} photoLabel={photoLabel} onPhotoClick={onPhotoClick} />;
}
