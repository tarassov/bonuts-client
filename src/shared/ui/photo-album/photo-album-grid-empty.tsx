import { PhotoLibraryOutlined } from "@mui/icons-material";

import { BntTypography } from "@/shared/ui/typography";

import styles from "./photo-album-grid.module.scss";

interface IPhotoAlbumGridEmptyProps {
	emptyText: string;
}

export function PhotoAlbumGridEmpty({ emptyText }: IPhotoAlbumGridEmptyProps) {
	return (
		<div className={styles.emptyState} data-testid="photo-album-grid-empty">
			<div className={styles.emptyIconWrap}>
				<PhotoLibraryOutlined />
			</div>
			<BntTypography variant="body1">{emptyText}</BntTypography>
		</div>
	);
}
