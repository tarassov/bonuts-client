import { GetPluginsApiResponse } from "services/api/bonuts-api";

import { TPlugin } from "@/types/model";

export const apiPluginAdaptor = (response: GetPluginsApiResponse): Array<TPlugin> => {
	const { data } = response;

	if (!data) return [];

	return data;
};
