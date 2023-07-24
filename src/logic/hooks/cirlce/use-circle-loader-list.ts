import { apiCirclesAdaptor } from "services/adaptor/api-circle-adaptor";
import { circlesApi } from "services/api/extended/circles-api";
import { useListBase } from "../use-list-base";

export const useCircleLoaderList = () => {
	return useListBase({
		endpoint: circlesApi.endpoints.getCircles,
		translator: apiCirclesAdaptor,
	});
};
