// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, API_URL_LOCAL, USE_LOCAL_API } from "../../config";
import { useStorage } from "../../hooks/use-storage";
import { RootState } from "../store/store";
import { PostAvatarsApiResponse } from "./bonuts-api";
const { getValue } = useStorage();

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
	baseUrl: USE_LOCAL_API ? API_URL_LOCAL : API_URL,
	prepareHeaders: (headers, { getState, endpoint }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const isAuthenticated = (getState() as RootState).auth.isAuthenticated;
		if (isAuthenticated) {
			headers.set("Authorization", `Bearer ${getValue("auth_token")}`);
		}

		if (endpoint === "postAvatars") {
			// headers.set("Content-Type", "multipart/form-data");
			// headers.set("Accept", "*/*");
		} else {
			headers.set("Accept", "application/json");
			headers.set("Content-Type", "application/json");
		}
		return headers;
	},
	mode: "cors",
	credentials: "include",
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
	baseQuery: baseQuery,
	endpoints: () => ({}),
});
