import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { emptyFunction } from "utils/empty-function";

import { Modules } from "constants/modules";

import { usePluginListLoader } from "@/entities/plugin";
import { PluginCard } from "@/widgets/plugin-list/ui/plugin-card";
import { PluginStack } from "@/widgets/plugin-list/ui/plugin-stack";

export const PluginList = () => {
	const { objects, isLoading } = usePluginListLoader();

	useLoader(Modules.Schedulers, isLoading);

	return (
		<PluginStack>
			{objects.map((x) => {
				return <PluginCard plugin={x} openEdit={emptyFunction} />;
			})}
		</PluginStack>
	);
};
