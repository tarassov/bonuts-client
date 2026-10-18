import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./photo-album-viewer.module.scss";
import type { IPhotoAlbumViewerProps, IPhotoAlbumViewerToolbarActionProps } from "./photo-album-viewer.types";
import { PhotoAlbumViewerStage } from "./photo-album-viewer-stage";
import { PhotoAlbumViewerThumbnails } from "./photo-album-viewer-thumbnails";
import { PhotoAlbumViewerToolbar } from "./photo-album-viewer-toolbar";
import { KeyboardKey } from "@/constants/keyboard";

export function PhotoAlbumViewer({ photos, initialIndex = 0, onClose, closeLabel, nextLabel, photoLabel, previousLabel, renderToolbarActions, title }: IPhotoAlbumViewerProps) {
	const boundedInitialIndex = Math.min(Math.max(initialIndex, 0), Math.max(photos.length - 1, 0));
	const [currentIndex, setCurrentIndex] = useState(boundedInitialIndex);
	const previousInitialIndex = useRef(initialIndex);
	const activeIndex = Math.min(currentIndex, Math.max(photos.length - 1, 0));
	const currentPhoto = photos[activeIndex];
	const canNavigate = photos.length > 1;

	useEffect(() => {
		if (photos.length === 0) {
			onClose();

			return;
		}

		const hasInitialIndexChanged = previousInitialIndex.current !== initialIndex;
		previousInitialIndex.current = initialIndex;

		setCurrentIndex((previousIndex) => {
			if (hasInitialIndexChanged) {
				return boundedInitialIndex;
			}

			return Math.min(previousIndex, photos.length - 1);
		});
	}, [boundedInitialIndex, initialIndex, onClose, photos.length]);

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
		goToIndex(activeIndex - 1);
	}, [activeIndex, goToIndex]);

	const handleNext = useCallback(() => {
		goToIndex(activeIndex + 1);
	}, [activeIndex, goToIndex]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === KeyboardKey.ArrowLeft) {
				event.preventDefault();
				handlePrevious();
			}

			if (event.key === KeyboardKey.ArrowRight) {
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

	const toolbarActionProps: IPhotoAlbumViewerToolbarActionProps = {
		currentIndex: activeIndex,
		currentPhoto,
		photoCount: photos.length,
	};

	return (
		<div className={styles.root} data-testid="photo-album-viewer">
			<PhotoAlbumViewerToolbar closeLabel={closeLabel} onClose={onClose} renderToolbarActions={renderToolbarActions} title={title} toolbarActionProps={toolbarActionProps} />
			<PhotoAlbumViewerStage
				activeIndex={activeIndex}
				canNavigate={canNavigate}
				currentPhoto={currentPhoto}
				nextLabel={nextLabel}
				onNext={handleNext}
				onPrevious={handlePrevious}
				photoLabel={photoLabel}
				previousLabel={previousLabel}
			/>
			{canNavigate ? <PhotoAlbumViewerThumbnails activeIndex={activeIndex} onThumbnailClick={goToIndex} photoLabel={photoLabel} photos={photos} /> : null}
		</div>
	);
}
