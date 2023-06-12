import { apiDonutsToDonuts, apiDonutToDonut } from "services/adaptor/api-donuts-to-donuts";
import { apiRequestsAdaptor } from "services/adaptor/api-requests-adaptor";
import { apiEventsToPosts } from "./api-events-to-posts";

export const apiAdaptor = (() => {
	return {
		toPosts: apiEventsToPosts,
		toDonuts: apiDonutsToDonuts,
		toDonut: apiDonutToDonut,
		toRequests: apiRequestsAdaptor,
	};
})();
