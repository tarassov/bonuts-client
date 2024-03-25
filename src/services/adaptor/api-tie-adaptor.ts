import { GetTiesApiResponse } from "services/api/bonuts-api";
import { TTie } from "@/types/model/tie";

export const apiTiesAdaptor = (response: GetTiesApiResponse): Array<TTie> => {
	if (!response) return [];

	return response;
};
