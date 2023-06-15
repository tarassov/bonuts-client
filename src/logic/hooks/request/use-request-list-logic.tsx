import { extendedApi } from "services/api/extended-api";
import { apiAdaptor } from "services/adaptor/api-adaptor";
import { useListBase } from "logic/hooks/use-list-base";

export const useRequestListLogic = ({
	archive,
	active,
	incoming,
}: {
	archive?: boolean;
	active?: boolean;
	incoming?: boolean;
}) => {
	return useListBase({
		endpoint: extendedApi.endpoints.getRequests,
		args: {
			page: 1,
			archive,
			active,
			incoming,
		},
		pollingInterval: 10000,
		translator: apiAdaptor.toRequests,
	});
};
