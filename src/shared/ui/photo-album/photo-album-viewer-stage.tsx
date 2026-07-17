import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

import { BntIconButton } from "@/shared/ui/icon-button";

import type { TPhotoAlbumItem } from "./photo-album-grid.types";
import styles from "./photo-album-viewer.module.scss";

interface IPhotoAlbumViewerStageProps {
	activeIndex: number;
	canNavigate: boolean;
	currentPhoto: TPhotoAlbumItem;
	nextLabel: string;
	onNext: VoidFunction;
	onPrevious: VoidFunction;
	photoLabel: string;
	previousLabel: string;
}

export function PhotoAlbumViewerStage({ activeIndex, canNavigate, currentPhoto, nextLabel, onNext, onPrevious, photoLabel, previousLabel }: IPhotoAlbumViewerStageProps) {
	return (
		<div className={styles.stage}>
			{canNavigate ? (
				<BntIconButton aria-label={previousLabel} data-testid="photo-album-previous" className={styles.navButton} onClick={onPrevious}>
					<ArrowBackIosNewOutlined fontSize="small" />
				</BntIconButton>
			) : null}
			<div className={styles.imageFrame}>
				<img className={styles.image} src={currentPhoto.originalUrl} alt={`${photoLabel} ${activeIndex + 1}`} />
			</div>
			{canNavigate ? (
				<BntIconButton aria-label={nextLabel} data-testid="photo-album-next" className={styles.navButton} onClick={onNext}>
					<ArrowForwardIosOutlined fontSize="small" />
				</BntIconButton>
			) : null}
		</div>
	);
}
