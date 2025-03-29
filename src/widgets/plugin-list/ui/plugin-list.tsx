import { useState } from "react";

import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { Modules } from "constants/modules";

import { usePluginListLoader } from "@/features/plugin";
import { usePluginUpdate } from "@/features/plugin/model/use-plugin-update";
import { PluginCard } from "@/widgets/plugin-list/ui/plugin-card";
import { PluginForm } from "@/widgets/plugin-list/ui/plugin-form";
import { PluginStack } from "@/widgets/plugin-list/ui/plugin-stack";

export const PluginList = () => {
	const { objects, isLoading } = usePluginListLoader();
	const [editId, setEditId] = useState<number | undefined>();
	const { updatePlugin } = usePluginUpdate();

	useLoader(Modules.Schedulers, isLoading);

	return (
		<PluginStack>
			{objects.map((x) => {
				const isEdit = editId === x.id;
				return (
					<div key={x.id}>
						{isEdit ? (
							<PluginForm
								plugin={x}
								onCancel={() => setEditId(undefined)}
								onSubmit={updatePlugin}
							/>
						) : (
							<PluginCard plugin={x} openEdit={() => setEditId(x.id)} />
						)}
					</div>
				);
			})}
		</PluginStack>
	);
};
