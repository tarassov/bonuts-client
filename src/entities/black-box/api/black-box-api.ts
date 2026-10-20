import { ApiTags } from "@/shared/api";

import { bonutsApi } from "@/services/api/bonuts-api";

/** An answer publishes the question: it changes the inbox, the team feed, the answer counts and everybody's bell. */
const ANSWER_CHANGES = [ApiTags.BlackBoxInbox, ApiTags.BlackBoxPublished, ApiTags.BlackBoxResponders, ApiTags.BlackBoxStatus] as const;

// noinspection TypeScriptValidateJSTypes
export const blackBoxApi = bonutsApi.enhanceEndpoints({
	addTagTypes: [ApiTags.BlackBoxInbox, ApiTags.BlackBoxPublished, ApiTags.BlackBoxResponders, ApiTags.BlackBoxStatus],
	endpoints: {
		getBlackBoxQuestions: { providesTags: [ApiTags.BlackBoxPublished] },
		postBlackBoxQuestions: { invalidatesTags: [ApiTags.BlackBoxInbox] },
		getBlackBoxInbox: { providesTags: [ApiTags.BlackBoxInbox] },
		postBlackBoxInboxByIdAnswer: { invalidatesTags: [...ANSWER_CHANGES] },
		putBlackBoxInboxByIdAnswer: { invalidatesTags: [...ANSWER_CHANGES] },
		getBlackBoxResponders: { providesTags: [ApiTags.BlackBoxResponders] },
		putBlackBoxResponders: { invalidatesTags: [ApiTags.BlackBoxResponders, ApiTags.BlackBoxStatus] },
		getBlackBoxStatus: { providesTags: [ApiTags.BlackBoxStatus] },
		postBlackBoxReadMark: { invalidatesTags: [ApiTags.BlackBoxStatus] },
	},
});

export const {
	useGetBlackBoxQuestionsQuery,
	usePostBlackBoxQuestionsMutation,
	usePostBlackBoxQuestionsLookupMutation,
	useGetBlackBoxInboxQuery,
	usePostBlackBoxInboxByIdAnswerMutation,
	usePutBlackBoxInboxByIdAnswerMutation,
	useGetBlackBoxRespondersQuery,
	usePutBlackBoxRespondersMutation,
	useGetBlackBoxStatusQuery,
	usePostBlackBoxReadMarkMutation,
} = blackBoxApi;
