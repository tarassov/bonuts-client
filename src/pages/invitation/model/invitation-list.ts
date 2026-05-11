import type { GetInvitationsApiResponse } from "@/services/api/bonuts-api";

export type TInvitationStatus = "accepted" | "closed" | "declined" | "sent";

export type TInvitationPreview = {
	id: string;
	name: string;
	caption?: string;
	email?: string;
	createdAt?: string;
	status: TInvitationStatus;
};

type TInvitationAttributes = NonNullable<NonNullable<GetInvitationsApiResponse["data"]>[number]["attributes"]> & {
	email?: string;
	first_name?: string;
	last_name?: string;
	created_at?: string;
	created_at_utc?: string;
};

const getInvitationStatus = (attributes: TInvitationAttributes): TInvitationStatus => {
	if (attributes.activated) return "accepted";
	if (attributes.closed) return "closed";
	if (attributes.declined) return "declined";

	return "sent";
};

const getInvitationName = (attributes: TInvitationAttributes): string => {
	const fullName = [attributes.first_name, attributes.last_name].filter(Boolean).join(" ");

	return fullName || attributes.name;
};

export const mapInvitationPreview = (response?: GetInvitationsApiResponse): Array<TInvitationPreview> => {
	if (!response?.data) return [];

	return response.data.map((target) => {
		const attributes = target.attributes as TInvitationAttributes;

		return {
			id: target.id,
			name: getInvitationName(attributes),
			caption: attributes.caption,
			email: attributes.email,
			createdAt: attributes.created_at_utc || attributes.created_at,
			status: getInvitationStatus(attributes),
		};
	});
};
