import { GetEventsApiResponse, GetEventsByIdApiResponse } from "../api/bonuts-api";

import { DealType } from "@/types/model/deal-type";
import type { TPost } from "@/types/model/post";
import type { TUser } from "@/types/model/user";

type TEventAttributes = NonNullable<GetEventsApiResponse["data"]>[number]["attributes"];
type TEventWithOptionalUser = {
	id: string;
	attributes: TEventAttributes & {
		last_seen_at?: string | null;
		user?: TUser | null;
	};
};

const resolveUser = (attributes: TEventWithOptionalUser["attributes"]): TUser | undefined => {
	if (attributes.user) {
		return {
			...attributes.user,
			user_name: attributes.user.user_name || attributes.user.name || attributes.user_name,
			last_seen_at: attributes.user.last_seen_at ?? attributes.last_seen_at ?? null,
			is_online: attributes.user.is_online ?? attributes.is_online,
		};
	}

	if (attributes.last_seen_at) {
		return {
			id: attributes.user_id,
			user_name: attributes.user_name,
			last_seen_at: attributes.last_seen_at,
			is_online: attributes.is_online,
		};
	}

	return undefined;
};

const translateData = (target: TEventWithOptionalUser): TPost => {
	const { attributes, id } = target;
	const user = resolveUser(attributes);

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
			last_seen_at: user?.last_seen_at || attributes.last_seen_at || undefined,
			is_online: user?.is_online ?? attributes.is_online,
		},
		title: attributes.user_name,
		extra_content: attributes.extra_content || "",

		operation: {
			...attributes.operation,
			id: attributes.operation?.id!,
			deal_type: attributes.operation?.deal_type as DealType,
			created_at: attributes.operation?.created_at || target.attributes.date_string,
			created_at_utc: attributes.operation?.created_at_utc || attributes.operation?.created_at || target.attributes.date_string,
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
