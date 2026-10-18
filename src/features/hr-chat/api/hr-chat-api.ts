import { bonutsApi } from "services/api/bonuts-api";

import { ApiTags } from "@/shared/api";
import { cacheByArgProperty, cacheByIdArgProperty } from "@/shared/lib/rtk";

// noinspection TypeScriptValidateJSTypes
export const hrChatApi = bonutsApi.enhanceEndpoints({
	addTagTypes: [ApiTags.HrChats, ApiTags.HrChat],
	endpoints: {
		getHrChats: { providesTags: [ApiTags.HrChats] },
		getHrChatsById: { providesTags: cacheByIdArgProperty(ApiTags.HrChat) },
		postHrChats: { invalidatesTags: [ApiTags.HrChats] },
		postHrChatsByHrChatIdMessages: {
			invalidatesTags: (result, error, arg) => [ApiTags.HrChats, ...cacheByArgProperty(ApiTags.HrChat, "hrChatId")(result, error, arg)],
		},
		deleteHrChatsById: {
			invalidatesTags: (result, error, arg) => [ApiTags.HrChats, ...cacheByIdArgProperty(ApiTags.HrChat)(result, error, arg)],
		},
	},
});

export const { useGetHrChatsQuery, useGetHrChatsByIdQuery, usePostHrChatsMutation, usePostHrChatsByHrChatIdMessagesMutation, useDeleteHrChatsByIdMutation } = hrChatApi;
