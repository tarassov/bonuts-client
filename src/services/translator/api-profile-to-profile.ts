import { TProfile } from "../../types/model";
import { GetProfileApiResponse } from "../api/bonuts-api";
import { getUserName } from "../logic-helpers/user-helper";

export const apiProfileToProfile = (
	response: GetProfileApiResponse
): TProfile | undefined => {
	if (!response.data) return undefined;
	const res: TProfile = {
		id: response?.data.id ? Number(response.data.id) : undefined,
		user_id: response.data.attributes?.user_id
			? Number(response.data.attributes?.user_id)
			: undefined,
		position: response.data.attributes?.position,
		user_name: response.data.attributes?.name,
		admin: response.data.attributes?.admin,
		user_avatar: response.data.attributes?.user_avatar,
	};
	return res;
};
