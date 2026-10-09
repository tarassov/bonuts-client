import path from "node:path";
import dns from "dns";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder("verbatim");

const getBuildVersion = () => {
	const timestamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
	const appEnvironment = process.env.VITE_APP_ENV ?? process.env.NODE_ENV ?? "development";

	return process.env.VITE_BUILD_VERSION ?? `${appEnvironment}-${timestamp}`;
};

const PWA_CACHE_VERSION = getBuildVersion();
const IMAGE_RUNTIME_CACHE_NAME = `bonuts-images-${PWA_CACHE_VERSION}`;
const WORKBOX_MAX_PRECACHE_FILE_SIZE_BYTES = 3 * 1024 * 1024;

export default defineConfig(({ mode }) => ({
	server: {
		port: mode === "e2e" ? 4173 : 3002,
		strictPort: true,
	},

	resolve: {
		alias: {
			graphology: path.resolve(__dirname, "node_modules/graphology/dist/graphology.cjs.js"),
		},
	},

	plugins: [
		...(process.env.NODE_ENV !== "production" && mode !== "e2e" ? [basicSsl()] : []),
		tsconfigPaths(),
		react(),
		svgr({
			svgrOptions: { icon: true },
		}),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			manifest: false, // keep if you're using your own file
			workbox: {
				cacheId: `bonuts-${PWA_CACHE_VERSION}`,
				cleanupOutdatedCaches: true,
				globPatterns: ["**/*.{js,css,html,ico,png,svg,json,webmanifest}"],
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
					if (id.includes("/node_modules/lodash/")) return "lodash";
					if (id.includes("/node_modules/ramda/")) return "ramda";
					if (id.includes("/node_modules/notistack/")) return "notistack";
					if (id.includes("/node_modules/@tanstack/")) return "tanstack";
					if (id.includes("/node_modules/i18next/")) return "i18next";
					if (id.includes("/node_modules/reagraph/")) return "reagraph";
					if (id.includes("/node_modules/@vkid/")) return "vkid";
					if (id.includes("/node_modules/spacetime/")) return "spacetime";
					if (id.includes("/node_modules/")) return "vendor";
				},
			},
		},
	},
}));
