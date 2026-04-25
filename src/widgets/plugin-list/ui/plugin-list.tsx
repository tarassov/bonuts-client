import { useState } from "react";

import { Modules } from "constants/modules";

import { useLoader } from "@/shared/ui/loader";

import { usePluginActivate, usePluginListLoader, usePluginUpdate } from "@/features/plugin";

import { PluginCard } from "./plugin-card";
import { PluginForm } from "./plugin-form";
import { PluginStack } from "./plugin-stack";

export const PluginList = () => {
	const { objects, isLoading } = usePluginListLoader();
	const [editId, setEditId] = useState<number | undefined>();
	const { updatePlugin } = usePluginUpdate();
	const { setActivatePlugin } = usePluginActivate();

	useLoader(Modules.Schedulers, isLoading);

	return (
		<PluginStack>
			{objects.map((x) => {
				const isEdit = editId === x.id;
				return (
					<div key={x.id}>
						{isEdit ? (
							<PluginForm plugin={x} onCancel={() => setEditId(undefined)} onSubmit={updatePlugin} onSetActive={setActivatePlugin} />
						) : (
							<PluginCard plugin={x} openEdit={() => setEditId(x.id)} />
						)}
					</div>
				);
			})}
		</PluginStack>
	);
};
