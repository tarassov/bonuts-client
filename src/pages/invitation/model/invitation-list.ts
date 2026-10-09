import type { GetInvitationsApiResponse } from "@/services/api/bonuts-api";
import { texts_a, texts_c, texts_d, texts_s } from "@/services/localization/texts";

export type TInvitationStatusType = "accepted" | "closed" | "declined" | "sent";

export type TInvitationStatus = {
	type: TInvitationStatusType;
	text: string;
};

export type TInvitationPreview = {
	id: string;
	name: string;
	caption?: string;
	email?: string;
	createdAt?: string;
	sentByName?: string;
	sentByEmail?: string;
	status: TInvitationStatus;
};

type TInvitation = NonNullable<GetInvitationsApiResponse["data"]>[number];

const defaultInvitationStatus: TInvitationStatus = {
	type: "sent",
	text: texts_s.sent,
};

const invitationStatusMap: Record<
	Exclude<TInvitationStatusType, "sent">,
	{
		isActive: (statuses: TInvitation["statuses"]) => boolean;
		status: TInvitationStatus;
	}
> = {
	accepted: {
		isActive: (statuses) => statuses.activated,
		status: {
			type: "accepted",
			text: texts_a.accepted,
		},
	},
	closed: {
		isActive: (statuses) => statuses.closed,
		status: {
			type: "closed",
			text: texts_c.closed,
		},
	},
	declined: {
		isActive: (statuses) => Boolean(statuses.declined),
		status: {
			type: "declined",
			text: texts_d.declined,
		},
	},
};

const getInvitationStatus = (invitation: TInvitation): TInvitationStatus => {
	return Object.values(invitationStatusMap).find(({ isActive }) => isActive(invitation.statuses))?.status ?? defaultInvitationStatus;
};

const getInvitationName = (invitation: TInvitation): string => {
	const sentTo = invitation.sent_to;
	const fullName = [sentTo.first_name, sentTo.last_name].filter(Boolean).join(" ");

	return fullName || sentTo.name || sentTo.email || invitation.tenant.caption;
};

const getSenderName = (invitation: TInvitation): string => {
	const sentBy = invitation.sent_by;
	const fullName = [sentBy.first_name, sentBy.last_name].filter(Boolean).join(" ");

	return fullName || sentBy.name || sentBy.email;
};

export const getInvitationInitials = (invitation: TInvitationPreview): string => {
	const source = invitation.name || invitation.email || invitation.caption || "";
	const words = source.split(" ").filter(Boolean);

	return words
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};

export const mapInvitationPreview = (response?: GetInvitationsApiResponse): Array<TInvitationPreview> => {
	if (!response?.data) return [];

	return response.data.map((invitation) => ({
		id: String(invitation.id),
		name: getInvitationName(invitation),
		caption: invitation.tenant.caption,
		email: invitation.sent_to.email,
		createdAt: invitation.sent_at,
		sentByName: getSenderName(invitation),
		sentByEmail: invitation.sent_by.email,
		status: getInvitationStatus(invitation),
	}));
};
