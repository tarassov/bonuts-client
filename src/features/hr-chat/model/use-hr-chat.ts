import { useCallback, useMemo } from "react";

import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";

import { useGetHrChatsByIdQuery, usePostHrChatsByHrChatIdMessagesMutation } from "../api/hr-chat-api";

import { hasPendingMessage, sortMessages } from "./hr-chat-helper";

/** While a reply is being generated the open chat is refreshed this often; otherwise slowly, but never stopped. */
const PENDING_POLL_INTERVAL_MS = 4000;
const IDLE_POLL_INTERVAL_MS = 30_000;

export const useHrChat = (chatId: number | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const skip = !authTenant || chatId === null;
	const { data, isLoading, currentData } = useGetHrChatsByIdQuery({ tenant: authTenant ?? "", id: chatId ?? 0 }, { skip, refetchOnFocus: true, pollingInterval: IDLE_POLL_INTERVAL_MS });
	const chat = data?.data ?? null;
	const currentChat = currentData?.data ?? null;
	const hasPending = hasPendingMessage(currentChat);
	// A second subscription with the fast interval only while a reply is pending; RTK Query polls at the shortest active interval.
	useGetHrChatsByIdQuery({ tenant: authTenant ?? "", id: chatId ?? 0 }, { skip: skip || !hasPending, pollingInterval: PENDING_POLL_INTERVAL_MS });
	const [sendMessage, { isLoading: isSending }] = usePostHrChatsByHrChatIdMessagesMutation();

	const messages = useMemo(() => sortMessages(currentChat?.messages ?? []), [currentChat]);

	const send = useCallback(
		async (text: string): Promise<boolean> => {
			if (!authTenant || chatId === null) return false;

			try {
				await sendMessage({ tenant: authTenant, hrChatId: chatId, body: { text } }).unwrap();
				return true;
			} catch {
				// The rejected action is already reported by rtkErrorHandler; here we only turn it into a result.
				return false;
			}
		},
		[authTenant, chatId, sendMessage]
	);

	return {
		chat,
		messages,
		isLoading,
		hasPending,
		isSending,
		send,
	};
};
