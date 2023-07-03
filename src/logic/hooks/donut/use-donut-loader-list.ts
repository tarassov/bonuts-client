import { donutsApi } from "services/api/extended/donuts-api";
import { apiDonutsToDonuts } from "services/adaptor/api-donuts-to-donuts";
import { useListBase } from "../use-list-base";

export const useDonutLoaderList = () => {
	return useListBase({
		endpoint: donutsApi.endpoints.getDonuts,
		translator: apiDonutsToDonuts,
	});
};
