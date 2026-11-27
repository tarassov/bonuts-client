import type { ChangeEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

import cn from "classnames";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_n, texts_p, texts_u } from "services/localization/texts";

import { useModal } from "@/shared/lib/modal";
import { BntButton } from "@/shared/ui/buttons";
import { BntCard } from "@/shared/ui/card";
import { PhotoAlbumGrid, type TPhotoAlbumItem } from "@/shared/ui/photo-album";
import { BntTypography } from "@/shared/ui/typography";

import { useProfilePhotos } from "../model/use-profile-photos";
import { useUpdateProfilePhotos } from "../model/use-update-profile-photos";

import styles from "./profile-photos.module.scss";
import type { TProfile } from "@/types/model";
import type { TPicture } from "@/types/model/picture";

interface IProfilePhotosProps {
	profile?: TProfile;
	canUpload?: boolean;
}

const PROFILE_PHOTO_FILE_ACCEPT = ".jpg,.jpeg,.gif,.png,.bmp,.webp";

function hasRenderablePhoto(photo: TPicture) {
	return Boolean(photo.preview?.url || photo.thumb?.url || photo.url);
}

export function ProfilePhotos({ profile, canUpload = false }: IProfilePhotosProps) {
	const { translate } = useBntTranslate();
	const { ProfilePhotosAlbumModal } = useModal();
	const { photos: persistedPhotos, isLoading } = useProfilePhotos(profile?.id);
	const { addPhoto } = useUpdateProfilePhotos();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const uploadSequence = useRef(0);
	const [failedUploads, setFailedUploads] = useState<Array<{ id: number; profileId: number; file: File }>>([]);

	const displayPhotos = useMemo<Array<TPicture>>(() => {
		return persistedPhotos.filter(hasRenderablePhoto);
	}, [persistedPhotos]);

	const galleryPhotos = useMemo<Array<TPhotoAlbumItem>>(() => {
		return displayPhotos
			.map((photo): TPhotoAlbumItem | undefined => {
				const previewUrl = photo.preview?.url || photo.thumb?.url || photo.url;
				const originalUrl = photo.url || photo.preview?.url || photo.thumb?.url;

				if (!previewUrl || !originalUrl) {
					return undefined;
				}

				return {
					...(photo.id ? { id: photo.id } : {}),
					...(photo.user_id ? { userId: photo.user_id } : {}),
					previewUrl,
					originalUrl,
					uploadingLabel: (photo.id ?? 0) < 0 ? translate(texts_u.uploading_photo) : undefined,
				} satisfies TPhotoAlbumItem;
			})
			.filter((photo): photo is TPhotoAlbumItem => Boolean(photo));
	}, [displayPhotos, translate]);

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	const uploadPhoto = async (upload: { id: number; profileId: number; file: File }) => {
		const succeeded = await addPhoto({ id: upload.profileId, file: upload.file });

		if (!succeeded) setFailedUploads((uploads) => [...uploads, upload]);
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files?.[0];
		event.currentTarget.value = "";

		if (file && profile?.id) {
			uploadPhoto({ id: ++uploadSequence.current, profileId: profile.id, file });
		}
	};

	const openPhoto = (index: number) => {
		const savedPhotos = displayPhotos.filter((photo) => (photo.id ?? 0) >= 0);
		const initialIndex = savedPhotos.indexOf(displayPhotos[index]);

		if (initialIndex < 0) return;

		ProfilePhotosAlbumModal.show({
			photos: savedPhotos,
			initialIndex,
			title: profile?.user_name || profile?.name || undefined,
		});
	};

	return (
		<BntCard elevation={0} className={cn(styles.card, { [styles.embedded]: !canUpload })}>
			<div className={styles.header}>
				<div className={styles.titleWrap}>
					<div className={styles.titleRow}>
						<BntTypography variant="h5">{translate(texts_p.photos)}</BntTypography>
						{galleryPhotos.length > 0 ? (
							<BntTypography variant="body2" color="text.secondary" className={styles.count}>
								{galleryPhotos.length}
							</BntTypography>
						) : null}
					</div>
				</div>
				{canUpload ? (
					<>
						<BntButton
							className={styles.uploadButton}
							sx={{ minHeight: 44, color: "common.black" }}
							noTransform
							disableElevation
							variant="contained"
							startIcon={<AddPhotoAlternateOutlined />}
							onClick={handleUploadClick}
							disabled={isLoading || !profile?.id}
						>
							{translate(texts_a.add_photo)}
						</BntButton>
						<input ref={inputRef} className={styles.input} type="file" accept={PROFILE_PHOTO_FILE_ACCEPT} onChange={handleFileChange} />
					</>
				) : null}
			</div>
			{canUpload
				? failedUploads
						.filter((upload) => upload.profileId === profile?.id)
						.map((upload) => (
							<div key={upload.id} className={styles.uploadError} role="alert">
								<BntTypography variant="body2">{translate(texts_u.upload_photo_failed, { name: upload.file.name })}</BntTypography>
								<BntButton
									noTransform
									onClick={() => {
										setFailedUploads((uploads) => uploads.filter(({ id }) => id !== upload.id));
										uploadPhoto(upload);
									}}
								>
									{translate(texts_u.upload_photo_retry)}
								</BntButton>
							</div>
						))
				: null}
			{!canUpload && !isLoading && galleryPhotos.length === 0 ? (
				<BntTypography variant="body2" color="text.secondary">
					{translate(texts_n.no_photos_yet)}
				</BntTypography>
			) : (
				<PhotoAlbumGrid photos={galleryPhotos} emptyText={translate(texts_n.no_photos_yet)} isLoading={isLoading} onPhotoClick={openPhoto} photoLabel={translate(texts_p.photos)} />
			)}
		</BntCard>
	);
}
