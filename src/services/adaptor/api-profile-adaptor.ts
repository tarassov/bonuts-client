import { GetProfileApiResponse, GetProfilesApiResponse } from "../api/bonuts-api";

import type { TProfile } from "@/types/model";
import { getProfilePhotos } from "@/types/model";
import type { TProfilePhotoSource } from "@/types/model/profile-photo";

export const dataToProfile = (data: Partial<GetProfileApiResponse["data"]>) => {
	if (!data) return undefined;
	const res: TProfile = {
		id: Number(data.id),
		...data.attributes,
		user_id: data.attributes?.user_id ? Number(data.attributes?.user_id) : undefined,
		position: data.attributes?.position,
		user_name: data.attributes?.name,
		admin: data.attributes?.admin,
		user_avatar: data.attributes?.user_avatar,
		email: data.attributes?.email,
		first_name: data.attributes?.first_name,
		last_name: data.attributes?.last_name,
		roles: data.attributes?.roles,
		tenant: data.attributes?.tenant,
		circles: data.attributes?.circles,
		birthdate: data.attributes?.birthdate || null,
		in_date: data.attributes?.in_date || null,
		bio: data.attributes?.bio || undefined,
		contact: data.attributes?.contact || undefined,
		locale: data.attributes?.locale || undefined,
		self_account: data.attributes?.self_account,
		distrib_account: data.attributes?.distrib_account,
		created_at: data.attributes?.created_at,
		tg_code: data.attributes?.tg_code || undefined,
		photos: getProfilePhotos(data.attributes as TProfilePhotoSource | undefined),
	};

	return res;
};
export const apiProfileAdaptor = (response?: GetProfileApiResponse): TProfile | undefined => {
	if (!response?.data || !response?.data?.id) return undefined;
	return dataToProfile(response.data);
};
export const apiProfilesAdaptor = (response: GetProfilesApiResponse): Array<TProfile> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			email: attributes?.email || "",
			birthdate: attributes?.birthdate || null,
			in_date: attributes?.in_date || null,
			bio: attributes?.bio || undefined,
			contact: attributes?.contact || undefined,
			locale: attributes?.locale || undefined,
			tg_code: attributes?.tg_code || undefined,
			photos: getProfilePhotos(attributes as TProfilePhotoSource),
			id: Number(id),
		};
	});
};
