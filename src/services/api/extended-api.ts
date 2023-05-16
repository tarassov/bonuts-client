import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { updateQueryData } from "services/api/update-query-data";
import { GetEventsApiResponse } from "./bonuts-api";
import { TPageable, TPaginator } from "@/types/api/api";
import { bonutsApiOverride } from "./form-data-api";

const getPaginator = (meta: FetchBaseQueryMeta | undefined): TPaginator => {
	return {
		perPage: Number(meta?.response?.headers.get("Per-Page")),
		total: Number(meta?.response?.headers.get("Total")),
	};
};
// noinspection TypeScriptValidateJSTypes
export const extendedApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Event"],
	endpoints: {
		getEvents: {
			providesTags: ["Event"],
			transformResponse(response: TPageable<GetEventsApiResponse>, meta) {
				response.paginator = getPaginator(meta);
				return response;
			},
		},
		putEventsById: {
			// invalidatesTags: ["Event"],
			async onQueryStarted(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				{ id, ...patch },
				{ dispatch, queryFulfilled, getState }
			) {
				const response = await queryFulfilled;
				// eslint-disable-next-line no-restricted-syntax
				for (const {
					endpointName,
					originalArgs,
				} of extendedApi.util.selectInvalidatedBy(getState(), ["Event"])) {
					// we only want to update `getEvents` here
					// eslint-disable-next-line no-continue
					if (endpointName !== "getEvents") continue;
					dispatch(updateQueryData(endpointName, originalArgs, response));
				}
			},
		},
	},
});

export const { useGetEventsQuery } = extendedApi;
