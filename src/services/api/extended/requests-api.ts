import { bonutsApiOverride } from "services/api/injected-api";

export const requestsApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Request"],
	endpoints: {},
});
