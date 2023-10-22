import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import basicSsl from "@vitejs/plugin-basic-ssl";
import pluginRewriteAll from "vite-plugin-rewrite-all";
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
		pluginRewriteAll(), //Vite plugin that fix dev server not rewriting the path includes a dot. https://www.npmjs.com/package/vite-plugin-rewrite-all
		basicSsl(),
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
