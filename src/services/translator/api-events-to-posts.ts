import { GetEventsApiResponse } from "../api/bonuts-api";
import { TPost } from "../../types/model/post";
import { DealType } from "../../types/model/deal_type";

export const apiEventsToPosts = (
	response: GetEventsApiResponse
): Array<TPost> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			id: Number(id),
			commentable: true,
			comments: attributes.comments,
			comments_count: attributes.comments_count,
			likeable: true,
			likes: attributes.likes,
			liked: attributes.liked,
			editable: attributes.editable,
			profile: {
				first_name: "",
				last_name: "",
				user_name: attributes.user_name,
				position: attributes.position,
				admin: false,
				user_avatar: attributes.user_avatar,
			},
			title: attributes.user_name,
			content: attributes.content,
			extra_content: attributes.extra_content || "",
			date_string: attributes.date_string,
			public: attributes.public,
			operation: {
				...attributes.operation,
				deal_type: attributes.operation?.deal_type as DealType,
				created_at: target.attributes.date_string,
			},
		};
	});
};
