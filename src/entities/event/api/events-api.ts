import type { TDispatchWithPatches } from "./lib/event-cache-updaters";
import { mergeServerLikeResponse, patchEventCaches } from "./lib/event-cache-updaters";
import type { GetEventsApiArg, GetEventsApiResponse, PostEventsByIdLikeApiArg, PutEventsByIdApiArg } from "@/services/api/bonuts-api";
import { bonutsApi } from "@/services/api/bonuts-api";
import { getPaginator } from "@/services/api/helpers/get-paginator";
import type { RootState } from "@/services/redux/store/store";
import { cacheByIdArgProperty } from "@/services/redux/utils/rtk-cache-utils";
import type { TPageable } from "@/types/api/api";

// noinspection TypeScriptValidateJSTypes
const eventsApiEnhanced = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Event"],
	endpoints: {
		getEvents(endpoint) {
			endpoint.providesTags = ["Event"];
			endpoint.transformResponse = (response: TPageable<GetEventsApiResponse>, meta) => {
				response.paginator = getPaginator(meta);
				return response;
			};
		},
		putEventsById: {
			async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
				const typedArg = arg as PutEventsByIdApiArg;
				const patches = patchEventCaches(eventsApi, dispatch as TDispatchWithPatches, getState() as RootState, typedArg.id, (event) => {
					if (!event.attributes) return;
					event.attributes.content = typedArg.body.content;
				});

				try {
					await queryFulfilled;
				} catch {
					patches.forEach((patch) => patch.undo());
				}
			},
		},
		postEventsByIdLike: {
			async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
				const typedArg = arg as PostEventsByIdLikeApiArg;
				const patches = patchEventCaches(eventsApi, dispatch as TDispatchWithPatches, getState() as RootState, typedArg.id, (event) => {
					if (!event.attributes) return;

					const likes = Array.isArray(event.attributes.likes) ? event.attributes.likes : [];
					const isLiked = Boolean(event.attributes.liked);

					event.attributes.liked = !isLiked;
					event.attributes.likes = isLiked ? likes.slice(0, Math.max(0, likes.length - 1)) : [...likes, {}];
				});

				try {
					const result = await queryFulfilled;
					mergeServerLikeResponse(eventsApi, dispatch as TDispatchWithPatches, getState() as RootState, typedArg.id, result.data);
				} catch {
					patches.forEach((patch) => patch.undo());
				}
			},
		},
		getEventsById: { providesTags: cacheByIdArgProperty("Event") },
	},
});

export const eventsApi = eventsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getEventsFeed: build.infiniteQuery<TPageable<GetEventsApiResponse>, Omit<GetEventsApiArg, "page">, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam: (lastPage, _allPages, lastPageParam) => {
					const perPage = lastPage?.paginator?.perPage || 1;
					const total = lastPage?.paginator?.total || 0;
					const hasNextPage = lastPageParam < total / perPage;

					return hasNextPage ? lastPageParam + 1 : undefined;
				},
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/events",
				params: { ...queryArg, page: pageParam },
			}),
			transformResponse: (response: TPageable<GetEventsApiResponse>, meta) => {
				response.paginator = getPaginator(meta);
				return response;
			},
			providesTags: ["Event"],
		}),
	}),
	overrideExisting: false,
});

export const { useGetEventsByIdQuery, usePostEventsByIdLikeMutation, useGetEventsFeedInfiniteQuery } = eventsApi;
