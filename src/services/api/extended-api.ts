import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { bonutsApi, GetEventsApiResponse } from "./bonuts-api";
import { TPageable, TPaginator } from "../../types/api";
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
				{ id, ...patch },
				{ dispatch, queryFulfilled, getState }
			) {
				const response = await queryFulfilled;
				for (const {
					endpointName,
					originalArgs,
				} of extendedApi.util.selectInvalidatedBy(getState(), ["Event"])) {
					// we only want to update `getEvents` here
					if (endpointName !== "getEvents") continue;
					dispatch(
						bonutsApi.util.updateQueryData(
							endpointName,
							originalArgs,
							(draft) => {
								const data = response?.data?.data;
								const dataArr = Array.isArray(data) ? data : [data];
								Array.isArray(dataArr) &&
									dataArr.forEach((el) => {
										if (draft.data) {
											const event = draft.data.find(
												(event) => event.id === el.id
											);
											if (event) {
												Object.assign(event, el);
											}
										}
									});
							}
						)
					);
				}
			},
		},
	},
});

export const { useGetEventsQuery } = extendedApi;
