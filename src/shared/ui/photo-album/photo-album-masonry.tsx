import type { ReactNode } from "react";
import Masonry from "@mui/lab/Masonry";

import styles from "./photo-album-grid.module.scss";

interface IPhotoAlbumMasonryProps {
	children: NonNullable<ReactNode>;
	testId: string;
	ariaHidden?: boolean;
}

export function PhotoAlbumMasonry({ ariaHidden, children, testId }: IPhotoAlbumMasonryProps) {
	return (
		<Masonry aria-hidden={ariaHidden} className={styles.albumGrid} columns={{ xs: 2, sm: 3, md: 4 }} data-testid={testId} spacing={{ xs: 1.5, sm: 2 }}>
			{children}
		</Masonry>
	);
}
