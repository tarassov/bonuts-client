import { usePostEventsByIdCommentsMutation, usePutEventsByIdMutation } from "services/api/bonuts-api";
import { eventsApi } from "services/api/extended/events-api";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppDispatch, useAppSelector } from "services/redux/store/store";
import { invalidateId } from "services/redux/utils/rtk-cache-utils";

import { TEvent } from "@/types/model";
import { TLikeable } from "@/types/model/type-extension";

type TEventUpdate = {
	content: string;
};
export const useEventLogic = () => {
	const [putEvent] = usePutEventsByIdMutation();
	const [postComment] = usePostEventsByIdCommentsMutation();
	const dispatch = useAppDispatch();
	// const [postComment] = usePostE
	const authTenant = useAppSelector(authTenantSelector);
	const toggleLike = async (event: TEvent & TLikeable) => {
		if (authTenant) {
			await putEvent({
				id: event.id.toString(),
				body: { like: true, tenant: authTenant }, // like true toggles like (backend hooks)
			});
			dispatch(eventsApi.util.invalidateTags(invalidateId("Event", event.id)));
		}
	};

	const updateEvent = async (event: TEvent & TLikeable, values: TEventUpdate) => {
		if (authTenant) {
			const res = await putEvent({
				id: event.id.toString(),
				body: { ...values, like: false, tenant: authTenant }, // like true toggles like (backend hooks)
			});
			if ("error" in res) {
				throw Error();
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
				throw Error();
			}
			dispatch(eventsApi.util.invalidateTags(invalidateId("Event", event.id)));
		}
	};

	return { toggleLike, updateEvent, createComment };
};
