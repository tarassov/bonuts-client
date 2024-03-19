import { tiesApi } from "services/api/extended/ties-api";
import { apiAdaptor } from "services/adaptor/api-adaptor";
import { useListBase } from "../use-list-base";

export const useTiesList = () => {
	return useListBase({
		endpoint: tiesApi.endpoints.getTies,
		translator: apiAdaptor.toPies,
	});
};
