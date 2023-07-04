import { updateQueryData } from "services/api/update-query-data";
import { GetEventsApiResponse } from "services/api/bonuts-api";
import { bonutsApiOverride } from "services/api/form-data-api";
import { getPaginator } from "services/api/helpers/get-paginator";
import { TPageable } from "@/types/api/api";

// noinspection TypeScriptValidateJSTypes
export const eventsApi = bonutsApiOverride.enhanceEndpoints({
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
					if (endpointName === "getEvents")
						dispatch(updateQueryData(endpointName, originalArgs, response));
				});
			},
		},
	},
});
