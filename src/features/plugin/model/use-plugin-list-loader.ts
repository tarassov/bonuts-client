import { apiPluginAdaptor, pluginsApi } from "@/entities/plugin";

import { useListBase } from "logic/hooks/use-list-base";

export const usePluginListLoader = () => {
	return useListBase({
		endpoint: pluginsApi.endpoints.getPlugins,
		translator: apiPluginAdaptor,
	});
};
