import { useListBase } from "./use-list-base";
import { extendedApi } from "../../services/api/extended-api";
import { apiDonutsToDonuts } from "../../services/translator/api-donuts-to-donuts";

export const useDonutList = () => {
	return useListBase({
		endpoint: extendedApi.endpoints.getDonuts,
		translator: apiDonutsToDonuts,
	});
};
