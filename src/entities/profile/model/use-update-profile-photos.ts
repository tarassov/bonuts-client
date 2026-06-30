import { texts_u } from "services/localization/texts/texts_u";
import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";
import { useNotification } from "@/shared/ui/notification";

import { photosApi } from "@/services/api/extended/photos-api";

export const useUpdateProfilePhotos = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const { showNotification } = useNotification();
	const [addProfilePhotoApi] = photosApi.useAddProfilePhotoMutation();
	const [deleteProfilePhotoApi] = photosApi.useDeleteProfilePhotoMutation();

	const addPhoto = async (args: { id: number; file: File }, options?: { onSuccess?: () => void }) => {
		const { id, file } = args;

		if (!authTenant) {
			return undefined;
		}

		const response = await addProfilePhotoApi({
			profileId: id,
			body: { tenant: authTenant, uploaded_image: file },
		});

		if ("data" in response) {
			options?.onSuccess?.();
			showNotification(texts_u.updated);
		}

		return response;
	};

	const deletePhoto = async (photoId?: number, options?: { onSuccess?: () => void }) => {
		if (!authTenant || !photoId) {
			return undefined;
		}

		const response = await deleteProfilePhotoApi({
			id: photoId,
			tenant: authTenant,
		});

		if ("data" in response) {
			options?.onSuccess?.();
			showNotification(texts_u.updated);
		}

		return response;
	};

	return { addPhoto, deletePhoto };
};
