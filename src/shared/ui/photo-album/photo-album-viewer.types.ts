import type { ReactNode } from "react";

import type { TPhotoAlbumItem } from "./photo-album-grid.types";

export interface IPhotoAlbumViewerToolbarActionProps {
	currentIndex: number;
	currentPhoto: TPhotoAlbumItem;
	photoCount: number;
}

export interface IPhotoAlbumViewerProps {
	photos: Array<TPhotoAlbumItem>;
	initialIndex?: number;
	onClose: VoidFunction;
	closeLabel: string;
	nextLabel: string;
	photoLabel: string;
	previousLabel: string;
	renderToolbarActions?: (props: IPhotoAlbumViewerToolbarActionProps) => ReactNode;
	title?: string;
}
