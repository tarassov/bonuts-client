import { useState } from "react";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

import classNames from "classnames";

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
	const [loadedOriginal, setLoadedOriginal] = useState<string>();
	const showPreview = currentPhoto.previewUrl !== currentPhoto.originalUrl && loadedOriginal !== currentPhoto.originalUrl;

	return (
		<div className={classNames(styles.stage, { [styles.singlePhotoStage]: !canNavigate })}>
			{canNavigate ? (
				<BntIconButton aria-label={previousLabel} data-testid="photo-album-previous" className={styles.navButton} onClick={onPrevious}>
					<ArrowBackIosNewOutlined fontSize="small" />
				</BntIconButton>
			) : null}
			<div className={styles.imageFrame}>
				{showPreview ? <img className={styles.image} src={currentPhoto.previewUrl} alt={`${photoLabel} ${activeIndex + 1}`} /> : null}
				<img
					key={currentPhoto.originalUrl}
					className={classNames(styles.image, { [styles.pendingOriginal]: showPreview })}
					src={currentPhoto.originalUrl}
					alt={showPreview ? "" : `${photoLabel} ${activeIndex + 1}`}
					aria-hidden={showPreview || undefined}
					onLoad={() => setLoadedOriginal(currentPhoto.originalUrl)}
				/>
			</div>
			{canNavigate ? (
				<BntIconButton aria-label={nextLabel} data-testid="photo-album-next" className={styles.navButton} onClick={onNext}>
					<ArrowForwardIosOutlined fontSize="small" />
				</BntIconButton>
			) : null}
		</div>
	);
}
