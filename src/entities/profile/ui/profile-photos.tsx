import type { ChangeEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_n, texts_p } from "services/localization/texts";

import { BntButton } from "@/shared/ui/buttons";
import { BntCard } from "@/shared/ui/card";
import { BntChip } from "@/shared/ui/chip";
import { PhotoAlbumGrid, type TPhotoAlbumItem } from "@/shared/ui/photo-album";
import { BntTypography } from "@/shared/ui/typography";

import { useModal } from "@/entities/modal";

import { useProfilePhotos } from "../model/use-profile-photos";
import { useUpdateProfilePhotos } from "../model/use-update-profile-photos";

import styles from "./profile-photos.module.scss";
import type { TProfile } from "@/types/model";
import type { TPicture } from "@/types/model/picture";

interface IProfilePhotosProps {
	profile?: TProfile;
	canUpload?: boolean;
}

function hasRenderablePhoto(photo: TPicture) {
	return Boolean(photo.preview?.url || photo.url || photo.thumb?.url);
}

export function ProfilePhotos({ profile, canUpload = false }: IProfilePhotosProps) {
	const { translate } = useBntTranslate();
	const { ProfilePhotosAlbumModal } = useModal();
	const { photos: persistedPhotos, isLoading } = useProfilePhotos(profile?.id);
	const { addPhoto } = useUpdateProfilePhotos();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [optimisticPhotoUrls, setOptimisticPhotoUrls] = useState<Array<string>>([]);
	const persistedPhotoCountRef = useRef(persistedPhotos.length);

	const photos = useMemo(() => {
		const optimisticPhotos: Array<TPicture> = optimisticPhotoUrls.map((url) => ({ url }));

		return [...persistedPhotos, ...optimisticPhotos];
	}, [optimisticPhotoUrls, persistedPhotos]);

	const displayPhotos = useMemo<Array<TPicture>>(() => {
		return photos.filter(hasRenderablePhoto);
	}, [photos]);

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

	useEffect(() => {
		return () => {
			optimisticPhotoUrls.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [optimisticPhotoUrls]);

	useEffect(() => {
		if (persistedPhotos.length > persistedPhotoCountRef.current && optimisticPhotoUrls.length > 0) {
			optimisticPhotoUrls.forEach((url) => URL.revokeObjectURL(url));
			setOptimisticPhotoUrls([]);
		}

		persistedPhotoCountRef.current = persistedPhotos.length;
	}, [optimisticPhotoUrls, persistedPhotos]);

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file || !profile?.id) {
			return;
		}

		const previewUrl = URL.createObjectURL(file);
		setOptimisticPhotoUrls((prev) => [...prev, previewUrl]);

		const response = await addPhoto(
			{ id: profile.id, file },
			{
				onSuccess: () => {
					event.target.value = "";
				},
			}
		);

		if ("error" in (response || {})) {
			URL.revokeObjectURL(previewUrl);
			setOptimisticPhotoUrls((prev) => prev.filter((item) => item !== previewUrl));
		}
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
						<input ref={inputRef} className={styles.input} type="file" accept="image/*" onChange={handleFileChange} />
					</>
				) : null}
			</div>
			<PhotoAlbumGrid photos={galleryPhotos} emptyText={translate(texts_n.no_photos_yet)} isLoading={isLoading} onPhotoClick={openPhoto} photoLabel={translate(texts_p.photos)} />
		</BntCard>
	);
}
