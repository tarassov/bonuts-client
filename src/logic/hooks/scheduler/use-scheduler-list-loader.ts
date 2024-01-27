import { schedulersApi } from "services/api/extended/scheduler-api";
import { apiSchedulersAdaptor } from "services/adaptor/api-scheduler-adaptor";
import { useListBase } from "../use-list-base";

export const useSchedulerListLoader = () => {
	return useListBase({
		endpoint: schedulersApi.endpoints.getDonutsSchedulers,
		translator: apiSchedulersAdaptor,
	});
};
