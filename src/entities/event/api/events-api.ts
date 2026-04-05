import type { GetEventsApiResponse } from "@/services/api/bonuts-api";
import { bonutsApi } from "@/services/api/bonuts-api";
import { getPaginator } from "@/services/api/helpers/get-paginator";
import { updateQueryData } from "@/services/api/update-query-data";
import { cacheByIdArgProperty } from "@/services/redux/utils/rtk-cache-utils";
import { TPageable } from "@/types/api/api";

// noinspection TypeScriptValidateJSTypes
export const eventsApi = bonutsApi.enhanceEndpoints({
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
			async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
				const response = await queryFulfilled;
				const events = eventsApi.util.selectInvalidatedBy(getState(), ["Event"]);
				events.forEach((event) => {
					const { endpointName, originalArgs } = event;
					if (endpointName === "getEvents") dispatch(updateQueryData(endpointName, originalArgs, response));
				});
			},
		},
		postEventsByIdLike: {
			async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
				const response = await queryFulfilled;
				const events = eventsApi.util.selectInvalidatedBy(getState(), ["Event"]);
				events.forEach((event) => {
					const { endpointName, originalArgs } = event;
					if (endpointName === "getEvents") dispatch(updateQueryData(endpointName, originalArgs, response));
				});
			},
		},
		getEventsById: { providesTags: cacheByIdArgProperty("Event") },
	},
});
export const { useGetEventsByIdQuery, usePostEventsByIdLikeMutation } = eventsApi;
