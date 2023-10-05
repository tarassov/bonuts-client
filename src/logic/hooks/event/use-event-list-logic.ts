import { apiAdaptor } from "services/adaptor/api-adaptor";
import { eventsApi } from "services/api/extended/events-api";
import { usePagintatedListBase } from "../use-pagintated-list-base";

export const useEventListLogic = ({ showMine = false }) => {
	return usePagintatedListBase({
		endpoint: eventsApi.endpoints.getEvents,
		args: {
			showMine: showMine ? "true" : "false",
			page: 1,
		},
		pollingInterval: 10000,
		translator: apiAdaptor.toPosts,
	});
};