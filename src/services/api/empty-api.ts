// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, API_URL_LOCAL, USE_LOCAL_API } from "../../config";
import { useStorage } from "../../hooks/use-storage";
import { RootState } from "../store/store";
const { getValue } = useStorage();

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
	baseUrl: USE_LOCAL_API ? API_URL_LOCAL : API_URL,
	prepareHeaders: (headers, { getState }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const isAuthenticated = (getState() as RootState).auth.isAuthenticated;
		if (isAuthenticated) {
			headers.set("Authorization", `Bearer ${getValue("auth_token")}`);
		}
		return headers;
	},
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
	baseQuery: baseQuery,
	endpoints: () => ({}),
});
