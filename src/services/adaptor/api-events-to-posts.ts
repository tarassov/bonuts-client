import { GetEventsApiResponse } from "../api/bonuts-api";
import { TPost } from "../../types/model/post";
import { DealType } from "../../types/model/deal-type";

export const apiEventsToPosts = (
	response: GetEventsApiResponse
): Array<TPost> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			id: Number(id),
			commentable: true,
			likeable: true,
			profile: {
				id: attributes.profile_id,
				first_name: "",
				last_name: "",
				user_name: attributes.user_name,
				position: attributes.position,
				admin: false,
				user_avatar: attributes.user_avatar,
			},
			title: attributes.user_name,
			extra_content: attributes.extra_content || "",

			operation: {
				...attributes.operation,
				deal_type: attributes.operation?.deal_type as DealType,
				created_at: target.attributes.date_string,
			},
		};
	});
};
