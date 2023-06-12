import { extendedApi } from "services/api/extended-api";
import { apiAdaptor } from "services/adaptor/api-adaptor";
import { useListBase } from "logic/hooks/use-list-base";

export const useRequestListLogic = () => {
	return useListBase({
		endpoint: extendedApi.endpoints.getRequests,
		args: {
			page: 1,
		},
		pollingInterval: 10000,
		translator: apiAdaptor.toRequests,
	});
};
