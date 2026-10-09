import type { ReactNode } from "react";
import { CloseOutlined } from "@mui/icons-material";

import { BntIconButton } from "@/shared/ui/icon-button";
import { BntTypography } from "@/shared/ui/typography";

import styles from "./photo-album-viewer.module.scss";
import type { IPhotoAlbumViewerToolbarActionProps } from "./photo-album-viewer.types";

interface IPhotoAlbumViewerToolbarProps {
	closeLabel: string;
	title?: string;
	toolbarActionProps: IPhotoAlbumViewerToolbarActionProps;

	onClose: VoidFunction;
	renderToolbarActions?: (props: IPhotoAlbumViewerToolbarActionProps) => ReactNode;
}

export function PhotoAlbumViewerToolbar({ closeLabel, onClose, renderToolbarActions, title, toolbarActionProps }: IPhotoAlbumViewerToolbarProps) {
	return (
		<div className={styles.toolbar}>
			<div className={styles.meta}>
				{title ? (
					<BntTypography variant="h5" className={styles.title}>
						{title}
					</BntTypography>
				) : null}
				<BntTypography variant="body2" color="text.secondary">
					{toolbarActionProps.currentIndex + 1} / {toolbarActionProps.photoCount}
				</BntTypography>
			</div>
			<div className={styles.toolbarActions}>
				{renderToolbarActions?.(toolbarActionProps)}
				<BntIconButton aria-label={closeLabel} data-testid="photo-album-close" onClick={onClose}>
					<CloseOutlined />
				</BntIconButton>
			</div>
		</div>
	);
}
