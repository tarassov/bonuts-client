import { useCallback, useMemo } from "react";

import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";
import { useNotification } from "@/shared/ui/notification";

import { useGetHrChatQuery, useSendHrChatMessageMutation } from "../api/hr-chat-api";

import { hasPendingMessage, sortMessages } from "./hr-chat-helper";

/** While a reply is being generated the open chat is refreshed this often; otherwise slowly, but never stopped. */
const PENDING_POLL_INTERVAL_MS = 4000;
const IDLE_POLL_INTERVAL_MS = 30_000;

export const useHrChat = (chatId: number | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { showResponseError } = useNotification();
	const skip = !authTenant || chatId === null;
	const { data: chat, isLoading, currentData } = useGetHrChatQuery({ tenant: authTenant ?? "", id: chatId ?? 0 }, { skip, refetchOnFocus: true, pollingInterval: IDLE_POLL_INTERVAL_MS });
	const hasPending = hasPendingMessage(currentData);
	// A second subscription with the fast interval only while a reply is pending; RTK Query polls at the shortest active interval.
	useGetHrChatQuery({ tenant: authTenant ?? "", id: chatId ?? 0 }, { skip: skip || !hasPending, pollingInterval: PENDING_POLL_INTERVAL_MS });
	const [sendMessage, { isLoading: isSending }] = useSendHrChatMessageMutation();

	const messages = useMemo(() => sortMessages(currentData?.messages ?? []), [currentData]);

	const send = useCallback(
		async (text: string): Promise<boolean> => {
			if (!authTenant || chatId === null) return false;

			try {
				await sendMessage({ tenant: authTenant, chatId, text }).unwrap();
				return true;
			} catch (requestError) {
				showResponseError(requestError);
				return false;
			}
		},
		[authTenant, chatId, sendMessage, showResponseError]
	);

	return {
		chat: chat ?? null,
		messages,
		isLoading,
		hasPending,
		isSending,
		send,
	};
};
