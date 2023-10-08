import { bonutsApi } from "services/api/bonuts-api";

const invitationsTag = "Invitations";
// noinspection TypeScriptValidateJSTypes
export const invitationsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: [invitationsTag],
	endpoints: {
		getInvitationsMy: {
			providesTags: [invitationsTag],
		},
		postInvitationsByIdAccept: {
			invalidatesTags: [invitationsTag],
		},
		postInvitationsByIdDecline: {
			invalidatesTags: [invitationsTag],
		},
		postInvitations: {
			invalidatesTags: [invitationsTag],
		},
	},
});

export const {
	useGetInvitationsMyQuery,
	usePostInvitationsByIdAcceptMutation,
	usePostInvitationsByIdDeclineMutation,
} = invitationsApi;
