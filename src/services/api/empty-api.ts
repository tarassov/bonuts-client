import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useStorage } from "hooks/use-storage";
import { API_URL, API_URL_LOCAL, USE_LOCAL_API } from "@/config";

const { getValue } = useStorage();

const formDataEndpoints = ["updateAvatars", "createDonut", "updateDonut"];

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
	baseUrl: USE_LOCAL_API ? API_URL_LOCAL : API_URL,
	prepareHeaders: (headers, { endpoint }) => {
		// By default, if we have a token in the store-manager, let's use that for authenticated requests
		const token = getValue("auth_token");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		if (formDataEndpoints.includes(endpoint)) {
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
	baseQuery,
	endpoints: () => ({}),
});
