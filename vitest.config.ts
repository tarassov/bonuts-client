import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	worker: {
		plugins: () => [react()],
	},
	test: {
		setupFiles: ["./src/__tests__/config/setup.ts"],
		environment: "jsdom",
		globals: true,
		coverage: {
			reporter: ["text", "json", "html"],
		},
	},
});
