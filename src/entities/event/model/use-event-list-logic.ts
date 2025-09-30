import { apiAdaptor } from "services/adaptor/api-adaptor";

import { usePagintatedListBase } from "logic/hooks/use-pagintated-list-base";

import { eventsApi } from "../api/events-api";

export const useEventListLogic = ({
	showMine = false,
	searchText = undefined,
}: {
	showMine: boolean;
	searchText?: string;
}) => {
	return usePagintatedListBase({
		endpoint: eventsApi.endpoints.getEvents,
		args: {
			showMine: showMine ? "true" : "false",
			searchText,
			page: 1,
		},
		pollingInterval: 10000,
		translator: apiAdaptor.toPosts,
	});
};
