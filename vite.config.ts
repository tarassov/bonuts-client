import path from "node:path";
import dns from "dns";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder("verbatim");

const PWA_CACHE_VERSION = "2026-04-29-1";
const IMAGE_RUNTIME_CACHE_NAME = `bonuts-images-${PWA_CACHE_VERSION}`;
const WORKBOX_MAX_PRECACHE_FILE_SIZE_BYTES = 3 * 1024 * 1024;

export default defineConfig({
	server: {
		port: 3002,
		strictPort: true,
	},

	resolve: {
		alias: {
			graphology: path.resolve(__dirname, "node_modules/graphology/dist/graphology.cjs.js"),
		},
	},

	plugins: [
		...(process.env.NODE_ENV !== "production" ? [basicSsl()] : []),
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
				cacheId: `bonuts-${PWA_CACHE_VERSION}`,
				cleanupOutdatedCaches: true,
				globPatterns: ["**/*.{js,css,ico,png,svg}"],
				maximumFileSizeToCacheInBytes: WORKBOX_MAX_PRECACHE_FILE_SIZE_BYTES,
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === "image",
						handler: "NetworkFirst",
						options: {
							cacheName: IMAGE_RUNTIME_CACHE_NAME,
							expiration: {
								maxEntries: 200,
								maxAgeSeconds: 60 * 60 * 24 * 30,
							},
						},
					},
				],
			},
			devOptions: {
				enabled: false,
			},
		}),
	],

	build: {
		minify: "esbuild",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react";
					if (id.includes("node_modules/lodash")) return "lodash";
					if (id.includes("node_modules/@emotion") || id.includes("node_modules/@mui")) return "mui";
					if (id.includes("node_modules/@tanstack")) return "tanstack";
					if (id.includes("node_modules/i18next")) return "i18next";
					if (id.includes("node_modules/reagraph")) return "reagraph";
					if (id.includes("node_modules")) return "vendor";
				},
			},
		},
	},
});
