import { extendedApi } from "services/api/extended-api";
import { apiCirclesAdaptor } from "services/adaptor/api-circle-adaptor";
import { useListBase } from "../use-list-base";

export const useCircleList = () => {
	return useListBase({
		endpoint: extendedApi.endpoints.getCircles,
		translator: apiCirclesAdaptor,
	});
};
