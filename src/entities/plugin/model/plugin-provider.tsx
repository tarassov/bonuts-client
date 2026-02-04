import { ReactNode, useCallback, useMemo, useRef } from "react";

import { PluginContext } from "./plugin-contex";

import type { IPluginApi } from "./plugin-types";

interface IProps {
	children: ReactNode;
}
export function PluginProvider({ children }: IProps) {
	const plugins = useRef(new Map());

	const register = useCallback((name: string, api: IPluginApi) => {
		plugins.current.set(name.toLowerCase(), api);
	}, []);

	const getPluginApi = useCallback((name: string) => {
		return plugins.current.get(name.toLowerCase());
	}, []);

	const value = useMemo(() => ({ getPluginApi, register }), []);

	return <PluginContext.Provider value={value}>{children}</PluginContext.Provider>;
}
