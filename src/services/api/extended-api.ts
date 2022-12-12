import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { bonutsApi, GetEventsApiResponse } from "./bonuts-api";
export type TPaginator = {
	perPage: number;
	totalPages: number;
};

const getPaginator = (meta: FetchBaseQueryMeta | undefined): TPaginator => {
	return {
		perPage: Number(meta?.response?.headers.get("Per-Page")),
		totalPages: Number(meta?.response?.headers.get("Total")),
	};
};
export const extendedApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Event"],
	endpoints: {
		getEvents: {
			providesTags: ["Event"],
			transformResponse: (
				response: GetEventsApiResponse & { paginator: TPaginator },
				meta
			) => {
				response.paginator = getPaginator(meta);
				return response;
			},
		},
	},
});

export const { useGetEventsQuery } = extendedApi;
