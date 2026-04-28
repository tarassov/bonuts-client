import { invalidateId } from "@/shared/lib/rtk";
import { authTenantSelector } from "@/shared/model/auth";

import { eventsApi, usePostEventsByIdLikeMutation } from "../api/events-api";

import { usePostEventsByIdCommentsMutation, usePutEventsByIdMutation } from "@/services/api/bonuts-api";
import { useAppDispatch, useAppSelector } from "@/services/redux/store/store";
import { TEvent } from "@/types/model";
import { TLikeable } from "@/types/model/type-extension";

type TEventUpdate = {
	content: string;
};
export const useEventLogic = () => {
	const [putEvent] = usePutEventsByIdMutation();
	const [postEventLike] = usePostEventsByIdLikeMutation();
	const [postComment] = usePostEventsByIdCommentsMutation();
	const dispatch = useAppDispatch();
	const authTenant = useAppSelector(authTenantSelector);
	const toggleLike = async (event: TEvent & TLikeable) => {
		if (authTenant) {
			const res = await postEventLike({
				id: event.id.toString(),
				body: { tenant: authTenant },
			});

			if ("error" in res) {
				throw res.error;
			}

			dispatch(eventsApi.util.invalidateTags(invalidateId("Event", event.id)));
		}
	};

	const updateEvent = async (event: TEvent & TLikeable, values: TEventUpdate) => {
		if (authTenant) {
			const res = await putEvent({
				id: event.id.toString(),
				body: { ...values, tenant: authTenant }, // like true toggles like (backend hooks)
			});

			if ("error" in res) {
				throw res.error;
			}

			dispatch(eventsApi.util.invalidateTags(invalidateId("Event", event.id)));
		}
	};

	const createComment = async (event: TEvent & TLikeable, text: string) => {
		if (authTenant) {
			const res = await postComment({
				id: event.id.toString(),
				body: { text, tenant: authTenant }, // like true toggles like (backend hooks)
			});
			if ("error" in res) {
				throw new Error();
			}
			dispatch(eventsApi.util.invalidateTags(invalidateId("Event", event.id)));
		}
	};

	return { toggleLike, updateEvent, createComment };
};
