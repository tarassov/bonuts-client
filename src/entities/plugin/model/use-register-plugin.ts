import { useContext, useEffect } from "react";

import { PluginContext } from "./plugin-contex";

import type { IPluginApi } from "./plugin-types";

export function useRegisterPlugin(name: string, api: IPluginApi) {
	const ctx = useContext(PluginContext);

	useEffect(() => {
		if (!ctx) throw new Error("useRegisterPlugin must be used inside PluginProvider");

		ctx.register(name, api);
	}, [ctx]);
}
