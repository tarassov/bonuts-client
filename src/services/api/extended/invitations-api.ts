import { bonutsApi } from "services/api/bonuts-api";

// noinspection TypeScriptValidateJSTypes
export const invitationsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Invitations"],
	endpoints: {
		getInvitationsMy: {
			providesTags: ["Invitations"],
		},
	},
});

export const { useGetInvitationsMyQuery } = invitationsApi;
