import { bonutsApiOverride } from "services/api/form-data-api";

export const profilesApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Profile"],
	endpoints: {},
});
