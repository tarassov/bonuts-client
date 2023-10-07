import { useListBase } from "logic/hooks/use-list-base";
import { invitationsApi } from "services/api/extended/invitations-api";
import { apiInvitationsAdaptor } from "services/adaptor/api-invitation-adaptor";

export const useInvitationLoaderList = () => {
	return useListBase({
		endpoint: invitationsApi.endpoints.getInvitationsMy,
		translator: apiInvitationsAdaptor,
	});
};
