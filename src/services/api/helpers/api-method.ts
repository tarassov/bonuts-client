import { buildFormData } from "services/api/helpers/build-form-data";
import { FetchArgs } from "@reduxjs/toolkit/query";

export const ApiMethod = <T extends { body: Record<string, any> }>(
	url: string,
	method: "POST" | "PUT",
	data: T
): FetchArgs => {
	return {
		url,
		method,
		credentials: "include",
		body: buildFormData(data?.body),
	};
};
