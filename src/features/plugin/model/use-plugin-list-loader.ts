import { useListBase } from "logic/hooks/use-list-base";

import { apiPluginAdaptor, pluginsApi } from "@/entities/plugin";

export const usePluginListLoader = () => {
	return useListBase({
		endpoint: pluginsApi.endpoints.getPlugins,
		translator: apiPluginAdaptor,
	});
};
