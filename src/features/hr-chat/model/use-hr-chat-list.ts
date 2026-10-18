import { useCallback } from "react";

import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";

import { useDeleteHrChatsByIdMutation, useGetHrChatsQuery, usePostHrChatsMutation } from "../api/hr-chat-api";

import type { THrChat } from "./hr-chat.types";

/** The list only needs to notice replies that finished in other chats, so it polls slowly. */
const LIST_POLL_INTERVAL_MS = 30_000;

const isForbiddenError = (error: unknown): boolean => typeof error === "object" && error !== null && "status" in error && error.status === 403;

export const useHrChatList = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, isLoading, error } = useGetHrChatsQuery({ tenant: authTenant ?? "" }, { skip: !authTenant, pollingInterval: LIST_POLL_INTERVAL_MS, refetchOnFocus: true });
	const [createChat, { isLoading: isCreating }] = usePostHrChatsMutation();
	const [deleteChat] = useDeleteHrChatsByIdMutation();

	const create = useCallback(
		async (text: string): Promise<THrChat | null> => {
			if (!authTenant) return null;

			try {
				const response = await createChat({ tenant: authTenant, body: { text } }).unwrap();

				return response.data;
			} catch {
				// The rejected action is already reported by rtkErrorHandler; here we only turn it into a result.
				return null;
			}
		},
		[authTenant, createChat]
	);

	const remove = useCallback(
		async (id: number): Promise<boolean> => {
			if (!authTenant) return false;

			try {
				await deleteChat({ tenant: authTenant, id }).unwrap();
				return true;
			} catch {
				// The rejected action is already reported by rtkErrorHandler; here we only turn it into a result.
				return false;
			}
		},
		[authTenant, deleteChat]
	);

	return {
		chats: data?.data ?? [],
		isLoading,
		isCreating,
		isUnavailable: isForbiddenError(error),
		create,
		remove,
	};
};
