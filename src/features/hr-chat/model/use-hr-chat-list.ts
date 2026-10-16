import { useCallback } from "react";

import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";
import { useNotification } from "@/shared/ui/notification";

import { useCreateHrChatMutation, useDeleteHrChatMutation, useGetHrChatListQuery } from "../api/hr-chat-api";

import type { THrChat } from "./hr-chat.types";

/** The list only needs to notice replies that finished in other chats, so it polls slowly. */
const LIST_POLL_INTERVAL_MS = 30_000;

const isForbiddenError = (error: unknown): boolean => typeof error === "object" && error !== null && "status" in error && error.status === 403;

export const useHrChatList = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const { showResponseError } = useNotification();
	const { data, isLoading, error } = useGetHrChatListQuery({ tenant: authTenant ?? "" }, { skip: !authTenant, pollingInterval: LIST_POLL_INTERVAL_MS, refetchOnFocus: true });
	const [createChat, { isLoading: isCreating }] = useCreateHrChatMutation();
	const [deleteChat] = useDeleteHrChatMutation();

	const create = useCallback(
		async (text: string): Promise<THrChat | null> => {
			if (!authTenant) return null;

			try {
				return await createChat({ tenant: authTenant, text }).unwrap();
			} catch (requestError) {
				showResponseError(requestError);
				return null;
			}
		},
		[authTenant, createChat, showResponseError]
	);

	const remove = useCallback(
		async (id: number): Promise<boolean> => {
			if (!authTenant) return false;

			try {
				await deleteChat({ tenant: authTenant, id }).unwrap();
				return true;
			} catch (requestError) {
				showResponseError(requestError);
				return false;
			}
		},
		[authTenant, deleteChat, showResponseError]
	);

	return {
		chats: data ?? [],
		isLoading,
		isCreating,
		isUnavailable: isForbiddenError(error),
		create,
		remove,
	};
};
