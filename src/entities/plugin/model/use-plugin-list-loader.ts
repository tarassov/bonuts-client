import { useListBase } from "logic/hooks/use-list-base";

import { pluginsApi } from "../api/plugins-api";

import { apiPluginAdaptor } from "@/entities/plugin/model/api-plugin-adaptor";

export const usePluginListLoader = () => {
	return useListBase({
		endpoint: pluginsApi.endpoints.getPlugins,
		translator: apiPluginAdaptor,
	});
};
