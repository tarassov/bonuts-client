import { bonutsApi } from "services/api/bonuts-api";

import { ApiTags } from "@/shared/api";

import type { THrChat, THrChatListItem, THrChatMessage } from "../model/hr-chat.types";

type TListResponse = { data: THrChatListItem[] };
type TChatResponse = { data: THrChat };
type TMessageResponse = { data: THrChatMessage };
type TDeleteResponse = { data: { id: number } };

type TTenantArg = { tenant: string };
type TChatArg = TTenantArg & { id: number };
type TCreateChatArg = TTenantArg & { text: string };
type TSendMessageArg = TTenantArg & { chatId: number; text: string };

// The generated endpoints type the payload as `object`; these wrappers carry the real chat shape.
const hrChatApiEnhanced = bonutsApi.enhanceEndpoints({
	addTagTypes: [ApiTags.HrChats, ApiTags.HrChat],
});

export const hrChatApi = hrChatApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getHrChatList: build.query<THrChatListItem[], TTenantArg>({
			query: ({ tenant }) => ({ url: "/hr_chats", params: { tenant } }),
			transformResponse: (response: TListResponse) => response.data,
			providesTags: [ApiTags.HrChats],
		}),
		getHrChat: build.query<THrChat, TChatArg>({
			query: ({ tenant, id }) => ({ url: `/hr_chats/${id}`, params: { tenant } }),
			transformResponse: (response: TChatResponse) => response.data,
			providesTags: (_result, _error, { id }) => [{ type: ApiTags.HrChat, id }],
		}),
		createHrChat: build.mutation<THrChat, TCreateChatArg>({
			query: ({ tenant, text }) => ({ url: "/hr_chats", method: "POST", params: { tenant }, body: { text } }),
			transformResponse: (response: TChatResponse) => response.data,
			invalidatesTags: [ApiTags.HrChats],
		}),
		sendHrChatMessage: build.mutation<THrChatMessage, TSendMessageArg>({
			query: ({ tenant, chatId, text }) => ({ url: `/hr_chats/${chatId}/messages`, method: "POST", params: { tenant }, body: { text } }),
			transformResponse: (response: TMessageResponse) => response.data,
			invalidatesTags: (_result, _error, { chatId }) => [ApiTags.HrChats, { type: ApiTags.HrChat, id: chatId }],
		}),
		deleteHrChat: build.mutation<{ id: number }, TChatArg>({
			query: ({ tenant, id }) => ({ url: `/hr_chats/${id}`, method: "DELETE", params: { tenant } }),
			transformResponse: (response: TDeleteResponse) => response.data,
			invalidatesTags: (_result, _error, { id }) => [ApiTags.HrChats, { type: ApiTags.HrChat, id }],
		}),
	}),
	overrideExisting: false,
});

export const { useGetHrChatListQuery, useGetHrChatQuery, useCreateHrChatMutation, useSendHrChatMessageMutation, useDeleteHrChatMutation } = hrChatApi;
