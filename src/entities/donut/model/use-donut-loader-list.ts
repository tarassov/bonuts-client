import { apiDonutsToDonuts } from "services/adaptor/api-donuts-to-donuts";
import { donutsApi } from "services/api/extended/donuts-api";

import { useListBase } from "logic/hooks/use-list-base";

export const useDonutLoaderList = (all?: boolean) => {
	return useListBase({
		endpoint: donutsApi.endpoints.getDonuts,
		args: { all: all ? "true" : "false", page: 1 },
		translator: apiDonutsToDonuts,
	});
};
