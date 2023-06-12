import { extendedApi } from "services/api/extended-api";
import { apiAdaptor } from "services/adaptor/api-adaptor";
import { usePagintatedListBase } from "../use-pagintated-list-base";

export const useEventListLogic = ({ showMine = false }) => {
	return usePagintatedListBase({
		endpoint: extendedApi.endpoints.getEvents,
		args: {
			showMine: showMine ? "true" : "false",
			page: 1,
		},
		pollingInterval: 10000,
		translator: apiAdaptor.toPosts,
	});
};
