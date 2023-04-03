import { TProfile } from "../../types/model";
import { GetProfileApiResponse } from "../api/bonuts-api";
import { getUserName } from "../../logic/utils/user-utils";

export const apiProfileToProfile = (
	response: GetProfileApiResponse
): TProfile | undefined => {
	if (!response.data || !response.data.id) return undefined;
	const res: TProfile = {
		id: Number(response.data.id),
		user_id: response.data.attributes?.user_id
			? Number(response.data.attributes?.user_id)
			: undefined,
		position: response.data.attributes?.position,
		user_name: response.data.attributes?.name,
		admin: response.data.attributes?.admin,
		user_avatar: response.data.attributes?.user_avatar,
		email: response.data.attributes?.email,
		first_name: response.data.attributes?.first_name,
		last_name: response.data.attributes?.last_name,
		roles: response.data.attributes?.roles,
		tenant: response.data.attributes?.tenant,
	};
	return res;
};
