import { apiInvitationsAdaptor } from "services/adaptor/api-invitation-adaptor";
import { invitationsApi } from "services/api/extended/invitations-api";

import { useListBase } from "logic/hooks/use-list-base";

export const useInvitationLoaderList = () => {
	return useListBase({
		endpoint: invitationsApi.endpoints.getInvitationsMy,
		translator: apiInvitationsAdaptor,
	});
};
