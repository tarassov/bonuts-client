import { GetEventsApiResponse, GetEventsByIdApiResponse } from "../api/bonuts-api";
import { TPost } from "@/types/model/post";
import { DealType } from "@/types/model/deal-type";

const translateData = (target: Required<Required<GetEventsByIdApiResponse>["data"]>): TPost => {
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
			id: attributes.operation?.id!,
			deal_type: attributes.operation?.deal_type as DealType,
			created_at: attributes.operation?.created_at || target.attributes.date_string,
			created_at_utc:
				attributes.operation?.created_at_utc ||
				attributes.operation?.created_at ||
				target.attributes.date_string,
		},
	};
};

export const apiEventToPost = (response: GetEventsByIdApiResponse): TPost | undefined => {
	if (!response?.data) return undefined;
	return translateData(response.data);
};

export const apiEventsToPosts = (response: GetEventsApiResponse): Array<TPost> => {
	if (!response) return [];
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		return translateData(target);
	});
};
