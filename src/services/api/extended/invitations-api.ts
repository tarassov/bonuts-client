import { getNextPageParam, getTransformPageableResponse } from "@/shared/lib/rtk";

import type { GetInvitationsApiArg, GetInvitationsApiResponse } from "@/services/api/bonuts-api";
import { bonutsApi } from "@/services/api/bonuts-api";
import type { TPageable } from "@/types/api/api";

const invitationsTag = "Invitations";
// noinspection TypeScriptValidateJSTypes
const invitationsApiEnhanced = bonutsApi.enhanceEndpoints({
	addTagTypes: [invitationsTag],
	endpoints: {
		getInvitations: {
			providesTags: [invitationsTag],
		},
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

export const invitationsApi = invitationsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getInvitationsFeed: build.infiniteQuery<TPageable<GetInvitationsApiResponse>, Omit<GetInvitationsApiArg, "page">, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/invitations",
				params: {
					tenant: queryArg.tenant,
					search_text: queryArg.searchText,
					page: pageParam,
					per_page: queryArg.perPage,
					declined: queryArg.declined,
					accepted: queryArg.accepted,
					closed: queryArg.closed,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetInvitationsApiResponse>>(),
			providesTags: [invitationsTag],
		}),
	}),
	overrideExisting: false,
});

export const { useGetInvitationsQuery, useGetInvitationsMyQuery, useGetInvitationsFeedInfiniteQuery, usePostInvitationsByIdAcceptMutation, usePostInvitationsByIdDeclineMutation } = invitationsApi;
