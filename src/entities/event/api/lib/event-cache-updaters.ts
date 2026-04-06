import type { PostEventsByIdLikeApiResponse } from "@/services/api/bonuts-api";
import type { RootState } from "@/services/redux/store/store";

type TEventEntity = {
	id?: string | number;
	attributes?: {
		content?: string;
		liked?: boolean;
		likes?: Array<unknown>;
	};
};

type TEventCacheName = "getEvents" | "getEventsFeed" | "getEventsById";

type TEventCacheRef = {
	endpointName: TEventCacheName;
	originalArgs: unknown;
};

type TPatchCollection = { undo: () => void };
export type TDispatchWithPatches = (action: unknown) => TPatchCollection;

const getEventCacheRefs = (eventsApi: any, state: RootState): Array<TEventCacheRef> => {
	const invalidated = eventsApi.util.selectInvalidatedBy(state, ["Event"]);

	return invalidated
		.filter((cache: any): cache is { endpointName: TEventCacheName; originalArgs: unknown } => {
			return cache.endpointName === "getEvents" || cache.endpointName === "getEventsFeed" || cache.endpointName === "getEventsById";
		})
		.map((cache: { endpointName: TEventCacheName; originalArgs: unknown }) => ({ endpointName: cache.endpointName, originalArgs: cache.originalArgs }));
};

const forEachEventInDraft = (draft: unknown, eventId: string, callback: (event: TEventEntity) => void) => {
	const mutableDraft = draft as {
		data?: TEventEntity | Array<TEventEntity>;
		pages?: Array<{ data?: Array<TEventEntity> }>;
	};

	if (Array.isArray(mutableDraft.data)) {
		mutableDraft.data.forEach((event) => {
			if (String(event.id) === eventId) callback(event);
		});
	}

	if (mutableDraft.data && !Array.isArray(mutableDraft.data) && String(mutableDraft.data.id) === eventId) {
		callback(mutableDraft.data);
	}

	if (Array.isArray(mutableDraft.pages)) {
		mutableDraft.pages.forEach((page) => {
			if (!Array.isArray(page.data)) return;
			page.data.forEach((event) => {
				if (String(event.id) === eventId) callback(event);
			});
		});
	}
};

export const patchEventCaches = (eventsApi: any, dispatch: TDispatchWithPatches, state: RootState, eventId: string, callback: (event: TEventEntity) => void) => {
	return getEventCacheRefs(eventsApi, state).map((cacheRef) => {
		return dispatch(
			eventsApi.util.updateQueryData(cacheRef.endpointName, cacheRef.originalArgs as never, (draft: unknown) => {
				forEachEventInDraft(draft, eventId, callback);
			})
		);
	});
};

export const mergeServerLikeResponse = (eventsApi: any, dispatch: TDispatchWithPatches, state: RootState, eventId: string, response: PostEventsByIdLikeApiResponse) => {
	const serverEvent = response?.data?.data?.[0];
	if (!serverEvent) return;

	patchEventCaches(eventsApi, dispatch, state, eventId, (event) => {
		Object.assign(event, serverEvent);
	});
};
