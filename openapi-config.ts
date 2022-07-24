import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
	schemaFile: "http://127.0.0.1:3000/api-docs/v1/swagger.json",
	apiFile: "./src/store/empty-api.ts",
	apiImport: "emptySplitApi",
	outputFile: "./src/store/bonuts-api.ts",
	exportName: "bonutsApi",
	hooks: true,
};

export default config;
