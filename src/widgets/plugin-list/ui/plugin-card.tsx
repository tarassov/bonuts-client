import { FC } from "react";

import { PluginCardContainer } from "./plugin-card-container";
import { PluginHeader } from "./plugin-header";

import { TPlugin } from "@/types/model";

export const PluginCard: FC<{
	preventEdit?: boolean;
	plugin: TPlugin;
	openEdit: VoidFunction;
}> = ({ plugin, preventEdit, openEdit }) => {
	return (
		<PluginCardContainer
			raised
			onClick={() => {
				if (!preventEdit) openEdit();
			}}
		>
			<PluginHeader plugin={plugin} />
		</PluginCardContainer>
	);
};
