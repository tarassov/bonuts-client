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
		activated: invitation.statuses.activated,
		closed: invitation.statuses.closed,
		declined: invitation.statuses.declined,
		logo: getInvitationLogo(invitation),
	}));
};
