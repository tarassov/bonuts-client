import { useCurrentProfile } from "@/shared/model/auth";

import { photosApi } from "@/services/api/extended/photos-api";

export const useProfilePhotos = (profileId?: number) => {
	const { authTenant } = useCurrentProfile();
	const { data, isLoading, error } = photosApi.useGetProfilePhotosQuery({ profileId: profileId || 0, tenant: authTenant || "" }, { skip: !profileId || !authTenant });

	return {
		photos: data || [],
		isLoading,
		error,
	};
};
