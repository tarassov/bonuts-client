import { bonutsApiOverride } from "services/api/form-data-api";

export const circlesApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Circle"],
	endpoints: {},
});
