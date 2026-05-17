import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
	addons: ["@storybook/addon-docs"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	viteFinal: async (config) =>
		mergeConfig(config, {
			plugins: [
				tsconfigPaths(),
				svgr({
					exportAsDefault: true,
					svgrOptions: { icon: true },
				}),
			],
		}),
};

export default config;
