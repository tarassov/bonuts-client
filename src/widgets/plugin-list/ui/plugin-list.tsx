import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { Modules } from "constants/modules";

import { usePluginListLoader } from "@/entities/plugin";

export const PluginList = () => {
	const { objects, isLoading } = usePluginListLoader();

	useLoader(Modules.Schedulers, isLoading);

	return <div>{objects.map((x) => x.name)}</div>;
};
