import { mergeConfig, type PluginOption } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import type { StorybookConfig } from "@storybook/react-vite";

const withoutPwaPlugins = (plugins: PluginOption[]): PluginOption[] =>
	plugins.flatMap((plugin) => {
		if (Array.isArray(plugin)) return withoutPwaPlugins(plugin);
		if (plugin && typeof plugin === "object" && "name" in plugin && plugin.name.startsWith("vite-plugin-pwa")) return [];

		return [plugin];
	});

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
	addons: ["@storybook/addon-docs"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	viteFinal: async (config) =>
		mergeConfig(
			{ ...config, plugins: withoutPwaPlugins(config.plugins || []) },
			{
				plugins: [
					tsconfigPaths(),
					svgr({
						exportAsDefault: true,
						svgrOptions: { icon: true },
					}),
				],
				optimizeDeps: {
					include: ["@mui/icons-material", "@mui/material", "react", "react-dom", "react-redux", "@reduxjs/toolkit", "notistack", "react-i18next", "i18next"],
				},
			}
		),
};

export default config;
