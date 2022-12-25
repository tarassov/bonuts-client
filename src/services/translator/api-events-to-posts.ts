import { GetEventsApiResponse } from "../api/bonuts-api";
import { TPost } from "../../types/model/post";

export const apiEventsToPosts = (
	response: GetEventsApiResponse
): Array<TPost> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		return {
			id: Number(target.id),
			commentable: true,
			comments: target.attributes.comments,
			comments_count: target.attributes.comment_count,
			likeable: true,
			likes: target.attributes.likes,
			profile: {
				first_name: "",
				last_name: "",
				user_name: target.attributes.user_name,
				position: "",
				admin: false,
			},
			title: target.attributes.user_name,
			content: target.attributes.content,
			extra_content: target.attributes.extra_content || "",
			date_string: target.attributes.date_string,
			public: target.attributes.public,
		};
	});
};
