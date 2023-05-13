import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// import * as path from "path";
import svgr from "vite-plugin-svgr";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3002,
	},
	plugins: [
		react(),
		tsconfigPaths(),
		svgr({
			exportAsDefault: true,
			svgrOptions: {
				icon: true,
			},
			include: "**/*.svg",
		}),
	],
	resolve: {
		// alias: {
		// 	scss: path.resolve(__dirname, "src/scss"),
		// },
	},
});
