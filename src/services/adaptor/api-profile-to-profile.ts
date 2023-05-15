import { TProfile } from "@/types/model";
import { GetProfileApiResponse, GetProfilesApiResponse } from "../api/bonuts-api";

const dataToProfile = (data: any) => {
	const res: TProfile = {
		id: Number(data.id),
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
	};
	return res;
};
export const apiProfileToProfile = (response: GetProfileApiResponse): TProfile | undefined => {
	if (!response.data || !response.data.id) return undefined;
	const res: TProfile = dataToProfile(response.data);
	return res;
};
export const apiProfilesToProfiles = (response: GetProfilesApiResponse): Array<TProfile> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			email: attributes?.email || "",
			id: Number(id),
		};
	});
};
