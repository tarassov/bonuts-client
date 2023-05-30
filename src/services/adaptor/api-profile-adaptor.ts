import { TProfile } from "@/types/model";
import { GetProfileApiResponse, GetProfilesApiResponse } from "../api/bonuts-api";

const dataToProfile = (data: GetProfileApiResponse["data"]) => {
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
		birthdate: data.attributes?.birthdate || undefined,
		in_date: data.attributes?.in_date || undefined,
		bio: data.attributes?.bio || undefined,
		contact: data.attributes?.contact || undefined,
	};
	return res;
};
export const apiProfileAdaptor = (response?: GetProfileApiResponse): TProfile | undefined => {
	if (!response?.data || !response?.data?.id) return undefined;
	const res: TProfile | undefined = dataToProfile(response.data);
	return res;
};
export const apiProfilesAdaptor = (response: GetProfilesApiResponse): Array<TProfile> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			email: attributes?.email || "",
			birthdate: attributes?.birthdate || undefined,
			in_date: attributes?.in_date || undefined,
			bio: attributes?.bio || undefined,
			contact: attributes?.contact || undefined,
			id: Number(id),
		};
	});
};
