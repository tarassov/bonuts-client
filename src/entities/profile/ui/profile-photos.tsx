import type { ChangeEvent } from "react";
import { useMemo, useRef } from "react";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_n, texts_p } from "services/localization/texts";

import { useModal } from "@/shared/lib/modal";
import { BntButton } from "@/shared/ui/buttons";
import { BntCard } from "@/shared/ui/card";
import { BntChip } from "@/shared/ui/chip";
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
	return Boolean(photo.preview?.url || photo.url || photo.thumb?.url);
}

export function ProfilePhotos({ profile, canUpload = false }: IProfilePhotosProps) {
	const { translate } = useBntTranslate();
	const { ProfilePhotosAlbumModal } = useModal();
	const { photos: persistedPhotos, isLoading } = useProfilePhotos(profile?.id);
	const { addPhoto } = useUpdateProfilePhotos();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const displayPhotos = useMemo<Array<TPicture>>(() => {
		return persistedPhotos.filter(hasRenderablePhoto);
	}, [persistedPhotos]);

	const galleryPhotos = useMemo<Array<TPhotoAlbumItem>>(() => {
		return displayPhotos
			.map((photo) => {
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
			})
			.filter((photo): photo is TPhotoAlbumItem => Boolean(photo));
	}, [displayPhotos]);

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file || !profile?.id) {
			return;
		}

		await addPhoto({ id: profile.id, file });
		event.target.value = "";
	};

	const openPhoto = (index: number) => {
		ProfilePhotosAlbumModal.show({
			photos: displayPhotos,
			initialIndex: index,
			title: profile?.user_name || profile?.name || undefined,
		});
	};

	return (
		<BntCard className={styles.card}>
			<div className={styles.header}>
				<div className={styles.titleWrap}>
					<div className={styles.titleRow}>
						<BntTypography variant="h5">{translate(texts_p.photos)}</BntTypography>
						{galleryPhotos.length > 0 ? <BntChip className={styles.countChip} label={galleryPhotos.length} size="small" color="secondary" variant="outlined" /> : null}
					</div>
				</div>
				{canUpload ? (
					<>
						<BntButton className={styles.uploadButton} noTransform variant="outlined" startIcon={<AddPhotoAlternateOutlined />} onClick={handleUploadClick}>
							{translate(texts_a.add_photo)}
						</BntButton>
						<input ref={inputRef} className={styles.input} type="file" accept={PROFILE_PHOTO_FILE_ACCEPT} onChange={handleFileChange} />
					</>
				) : null}
			</div>
			<PhotoAlbumGrid photos={galleryPhotos} emptyText={translate(texts_n.no_photos_yet)} isLoading={isLoading} onPhotoClick={openPhoto} photoLabel={translate(texts_p.photos)} />
		</BntCard>
	);
}
