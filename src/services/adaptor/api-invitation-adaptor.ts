import type { GetInvitationsMyApiResponse } from "@/services/api/bonuts-api";
import type { TInvitation } from "@/types/model/inivtation";
import type { TPicture } from "@/types/model/picture";

type TApiInvitation = NonNullable<GetInvitationsMyApiResponse["data"]>[number];

const getInvitationLogo = (invitation: TApiInvitation): TPicture | undefined => {
	const { logo } = invitation.tenant;

	return logo && typeof logo === "object" ? (logo as TPicture) : undefined;
};

export const apiInvitationsAdaptor = (response: GetInvitationsMyApiResponse): Array<TInvitation> => {
	const { data } = response;

	if (!data) return [];

	return data.map((invitation) => ({
		id: invitation.id,
		name: invitation.tenant.name,
		caption: invitation.tenant.caption,
		activeUsersCount: invitation.tenant.active_users_count,
		activated: invitation.statuses.activated,
		closed: invitation.statuses.closed,
		declined: invitation.statuses.declined,
		expirationDate: invitation.expiration_date,
		logo: getInvitationLogo(invitation),
		recipientEmail: invitation.sent_to.email,
		recipientName: invitation.sent_to.name || [invitation.sent_to.first_name, invitation.sent_to.last_name].filter(Boolean).join(" "),
		sentAt: invitation.sent_at,
		sentByEmail: invitation.sent_by.email,
		sentByName: invitation.sent_by.name || [invitation.sent_by.first_name, invitation.sent_by.last_name].filter(Boolean).join(" "),
	}));
};
