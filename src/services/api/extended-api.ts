import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { bonutsApi, GetEventsApiResponse } from "./bonuts-api";
import { TPageable, TPaginator } from "../../types/api";

const getPaginator = (meta: FetchBaseQueryMeta | undefined): TPaginator => {
	return {
		perPage: Number(meta?.response?.headers.get("Per-Page")),
		totalPages: Number(meta?.response?.headers.get("Total")),
	};
};
// noinspection TypeScriptValidateJSTypes
export const extendedApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Event"],
	endpoints: {
		getEvents: {
			providesTags: ["Event"],
			transformResponse(response: TPageable<GetEventsApiResponse>, meta) {
				response.paginator = getPaginator(meta);
				return response;
			},
		},
	},
});

export const { useGetEventsQuery } = extendedApi;
