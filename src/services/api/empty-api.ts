// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
	baseUrl: "https://api.bonuts.ru/api/v1/",
	//baseUrl: "http://localhost:3000/api/v1/",
	prepareHeaders: (headers, { getState }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
	baseQuery: baseQuery,
	endpoints: () => ({}),
});
