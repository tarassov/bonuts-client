import { extendedApi } from "services/api/extended-api";
import { apiDonutsToDonuts } from "services/adaptor/api-donuts-to-donuts";
import { useListBase } from "../use-list-base";

export const useDonutList = () => {
	return useListBase({
		endpoint: extendedApi.endpoints.getDonuts,
		translator: apiDonutsToDonuts,
	});
};
