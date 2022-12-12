import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
	schemaFile: "http://127.0.0.1:3000/api-docs/v1/swagger.json",
	apiFile: "./src/services/store/empty-api.ts",
	apiImport: "emptySplitApi",
	outputFile: "./src/services/store/bonuts-api.ts",
	exportName: "bonutsApi",
	hooks: true,
};

export default config;
