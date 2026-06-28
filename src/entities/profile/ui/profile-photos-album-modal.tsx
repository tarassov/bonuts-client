import { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_d, texts_n, texts_p } from "services/localization/texts";

import { useCurrentProfile } from "@/shared/model/auth";
import { BntButton } from "@/shared/ui/buttons";
import type { TDialogProps } from "@/shared/ui/dialog";
import { PhotoAlbumViewer, type TPhotoAlbumItem } from "@/shared/ui/photo-album";

import { useUpdateProfilePhotos } from "../model/use-update-profile-photos";

import type { TPicture } from "@/types/model/picture";

interface IProfilePhotosAlbumModalProps extends TDialogProps {
	photos: Array<TPicture>;
	initialIndex?: number;
	title?: string;
}

function getAlbumPhoto(photo: TPicture): TPhotoAlbumItem | undefined {
	const previewUrl = photo.preview?.url || photo.url || photo.thumb?.url;
	const originalUrl = photo.url || photo.preview?.url || photo.thumb?.url;

	if (!previewUrl || !originalUrl) {
		return undefined;
	}

	return {
		...(photo.id ? { id: photo.id } : {}),
		...(photo.user_id ? { userId: photo.user_id } : {}),
		previewUrl,
		originalUrl,
	} satisfies TPhotoAlbumItem;
}

export function ProfilePhotosAlbumModal({ close, photos, initialIndex = 0, title }: IProfilePhotosAlbumModalProps) {
	const { translate } = useBntTranslate();
	const { profile } = useCurrentProfile();
	const { deletePhoto } = useUpdateProfilePhotos();
	const [modalPhotos, setModalPhotos] = useState<Array<TPicture>>(photos);
	const [isDeleting, setIsDeleting] = useState(false);

	const albumPhotos = useMemo(() => {
		return modalPhotos.map(getAlbumPhoto).filter((photo): photo is TPhotoAlbumItem => Boolean(photo));
	}, [modalPhotos]);

	useEffect(() => {
		setModalPhotos(photos);
	}, [photos]);

	const handleDeletePhoto = useCallback(
		async (photo: TPhotoAlbumItem) => {
			if (!photo.id || isDeleting) {
				return;
			}

			setIsDeleting(true);

			const response = await deletePhoto(photo.id, {
				onSuccess: () => {
					setModalPhotos((prev) => {
						const nextPhotos = prev.filter((item) => item.id !== photo.id);

						if (nextPhotos.length === 0) {
							close();
						}

						return nextPhotos;
					});
				},
			});

			setIsDeleting(false);

			return response;
		},
		[close, deletePhoto, isDeleting]
	);

	return (
		<PhotoAlbumViewer
			photos={albumPhotos}
			initialIndex={initialIndex}
			title={title}
			closeLabel={translate(texts_c.close)}
			nextLabel={translate(texts_n.next)}
			photoLabel={translate(texts_p.photos)}
			previousLabel={translate(texts_p.previous)}
			onClose={() => close()}
			renderToolbarActions={({ currentPhoto }) =>
				currentPhoto.id && currentPhoto.userId === profile?.user_id ? (
					<BntButton
						color="error"
						data-testid="profile-photo-delete"
						disabled={isDeleting}
						noTransform
						size="small"
						startIcon={<DeleteOutline />}
						variant="outlined"
						onClick={() => handleDeletePhoto(currentPhoto)}
					>
						{translate(texts_d.delete_photo)}
					</BntButton>
				) : null
			}
		/>
	);
}
