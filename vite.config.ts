import dns from "dns";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
	server: {
		port: 3002,
		strictPort: true,
		// allowedHosts: ["localhost", "127.0.0.1", "interzooecial-jean-subventrally.ngrok-free.dev"],
	},

	plugins: [
		basicSsl(),
		tsconfigPaths(),
		react(),
		svgr({
			exportAsDefault: true,
			svgrOptions: { icon: true },
		}),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			manifest: false, // keep if you're using your own file
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],

	build: {
		minify: "esbuild",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/lodash")) return "lodash";
					if (id.includes("node_modules/@tanstack")) return "tanstack";
					if (id.includes("node_modules/i18next")) return "i18next";
					if (id.includes("node_modules/reagraph")) return "reagraph";
					if (id.includes("node_modules")) return "vendor";
				},
			},
		},
	},
});
