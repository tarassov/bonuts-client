import { bonutsApiOverride } from "services/api/form-data-api";

export const requestsApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Request"],
	endpoints: {},
});
