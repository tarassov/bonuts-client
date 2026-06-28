import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, CloseOutlined } from "@mui/icons-material";

import { BntIconButton } from "@/shared/ui/icon-button";
import { BntTypography } from "@/shared/ui/typography";

import type { TPhotoAlbumItem } from "./photo-album-grid";
import styles from "./photo-album-viewer.module.scss";

interface IPhotoAlbumViewerProps {
	photos: Array<TPhotoAlbumItem>;
	initialIndex?: number;
	onClose: VoidFunction;
	closeLabel: string;
	nextLabel: string;
	photoLabel: string;
	previousLabel: string;
	renderToolbarActions?: (props: { currentIndex: number; currentPhoto: TPhotoAlbumItem; photoCount: number }) => ReactNode;
	title?: string;
}

export function PhotoAlbumViewer({ photos, initialIndex = 0, onClose, closeLabel, nextLabel, photoLabel, previousLabel, renderToolbarActions, title }: IPhotoAlbumViewerProps) {
	const boundedInitialIndex = Math.min(Math.max(initialIndex, 0), Math.max(photos.length - 1, 0));
	const [currentIndex, setCurrentIndex] = useState(boundedInitialIndex);
	const currentPhoto = photos[currentIndex];
	const canNavigate = photos.length > 1;

	useEffect(() => {
		setCurrentIndex(boundedInitialIndex);
	}, [boundedInitialIndex]);

	const goToIndex = useCallback(
		(nextIndex: number) => {
			if (!canNavigate) {
				return;
			}

			const normalizedIndex = (nextIndex + photos.length) % photos.length;
			setCurrentIndex(normalizedIndex);
		},
		[canNavigate, photos.length]
	);

	const handlePrevious = useCallback(() => {
		goToIndex(currentIndex - 1);
	}, [currentIndex, goToIndex]);

	const handleNext = useCallback(() => {
		goToIndex(currentIndex + 1);
	}, [currentIndex, goToIndex]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				handlePrevious();
			}

			if (event.key === "ArrowRight") {
				event.preventDefault();
				handleNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleNext, handlePrevious]);

	if (!currentPhoto) {
		return null;
	}

	return (
		<div className={styles.root} data-testid="photo-album-viewer">
			<div className={styles.toolbar}>
				<div className={styles.meta}>
					{title ? (
						<BntTypography variant="h5" className={styles.title}>
							{title}
						</BntTypography>
					) : null}
					<BntTypography variant="body2" color="text.secondary">
						{currentIndex + 1} / {photos.length}
					</BntTypography>
				</div>
				<div className={styles.toolbarActions}>
					{renderToolbarActions?.({
						currentIndex,
						currentPhoto,
						photoCount: photos.length,
					})}
					<BntIconButton aria-label={closeLabel} data-testid="photo-album-close" onClick={onClose}>
						<CloseOutlined />
					</BntIconButton>
				</div>
			</div>
			<div className={styles.stage}>
				{canNavigate ? (
					<BntIconButton aria-label={previousLabel} data-testid="photo-album-previous" className={styles.navButton} onClick={handlePrevious}>
						<ArrowBackIosNewOutlined fontSize="small" />
					</BntIconButton>
				) : null}
				<div className={styles.imageFrame}>
					<img className={styles.image} src={currentPhoto.originalUrl} alt={`${photoLabel} ${currentIndex + 1}`} />
				</div>
				{canNavigate ? (
					<BntIconButton aria-label={nextLabel} data-testid="photo-album-next" className={styles.navButton} onClick={handleNext}>
						<ArrowForwardIosOutlined fontSize="small" />
					</BntIconButton>
				) : null}
			</div>
			{canNavigate ? (
				<div className={styles.thumbnailRail} data-testid="photo-album-thumbnails">
					{photos.map((photo, index) => (
						<button
							key={`${photo.originalUrl}-${index}`}
							data-testid={`photo-album-thumbnail-${index}`}
							type="button"
							className={`${styles.thumbnailButton} ${index === currentIndex ? styles.thumbnailButtonActive : ""}`}
							onClick={() => goToIndex(index)}
						>
							<img className={styles.thumbnailImage} src={photo.previewUrl} alt={`${photoLabel} ${index + 1}`} />
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}
