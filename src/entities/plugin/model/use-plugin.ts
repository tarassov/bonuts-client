import { useContext } from "react";

import { PluginContext } from "./plugin-contex";

export function usePlugin(name: string) {
	const ctx = useContext(PluginContext);
	if (!ctx) throw new Error("Missing PluginProvider");

	return ctx.getPluginApi(name);
}
