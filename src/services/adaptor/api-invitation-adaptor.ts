import { GetInvitationsMyApiResponse } from "services/api/bonuts-api";

import { TInvitation } from "@/types/model/inivtation";

export const apiInvitationsAdaptor = (
	response: GetInvitationsMyApiResponse
): Array<TInvitation> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			id: Number(id),
		};
	});
};
