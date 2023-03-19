import { extendedApi } from "../../services/api/extended-api";
import { apiTranslator } from "../../services/translator";
import { usePagintatedListBase } from "./use-pagintated-list-base";

export const useEventListLogic = ({ showMine = false }) => {
	return usePagintatedListBase({
		endpoint: extendedApi.endpoints.getEvents,
		args: {
			showMine: showMine ? "true" : "false",
			page: 1,
		},
		pollingInterval: 10000,
		translator: apiTranslator.toPosts,
	});
};
