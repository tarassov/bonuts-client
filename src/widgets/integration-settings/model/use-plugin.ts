import { useEffect, useState } from "react";

export function usePlugin() {
	const [plugins, setPlugins] = useState([]);

	useEffect(() => {});

	const isConnected = (pluginName: string) => {
		return { isConnected: false, needConnect: false };
	};

	const connectPlugin = (pluginName: string) => {};

	return { isConnected, connectPlugin };
}
