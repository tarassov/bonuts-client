/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";
export default defineConfig({
	plugins: [react({ fastRefresh: false }), tsconfigPaths()],
	worker: {
		plugins: [react()],
	},
	resolve: {
		alias: {
			// scss: path.resolve(__dirname, 'src/scss')
		},
	},
	test: {
		setupFiles: ["./src/__tests__/config/setup.ts"],
		environment: "jsdom",
		globals: true,
		coverage: {
			reporter: ["text", "json", "html"],
		},
		transformMode: {
			web: [/\.[jt]sx$/],
		},
		//  deps: { experimentalOptimizer: { include: ['react-abac'], enabled: true } }
	},
});
