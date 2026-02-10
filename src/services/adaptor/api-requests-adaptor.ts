import { dataToProfile } from "services/adaptor/api-profile-adaptor";
import { GetRequestsApiResponse } from "services/api/bonuts-api";

import { TRequest } from "@/types/model/request";

export const apiRequestsAdaptor = (response: GetRequestsApiResponse): Array<TRequest> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			enabled: Boolean(attributes?.enabled),
			profile: dataToProfile({
				attributes: attributes?.profile,
				id: attributes?.profile.id.toString(),
			}),
			id: Number(id),
		};
	});
};
