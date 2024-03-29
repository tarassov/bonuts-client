import { apiAdaptor } from "services/adaptor/api-adaptor";
import { useListBase } from "logic/hooks/use-list-base";
import { requestsApi } from "services/api/extended/requests-api";

export const useRequestListLogic = ({
	archive,
	active,
	incoming,
	my,
}: {
	archive?: boolean;
	active?: boolean;
	incoming?: boolean;
	my?: boolean;
}) => {
	return useListBase({
		endpoint: requestsApi.endpoints.getRequests,
		args: {
			page: 1,
			archive,
			active,
			incoming,
			my,
		},
		pollingInterval: 10000,
		translator: apiAdaptor.toRequests,
	});
};
