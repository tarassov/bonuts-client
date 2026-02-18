import React from "react";

import { CommonStrings } from "constants/dictionary";
import { BntBreadcrumbs } from "shared/ui/breadcrumb/breadcrumbs";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "shared/ui/stack";
import { TBntBreadcrumbItem } from "shared/ui/types/breadcrumbs-types";

import { PluginList } from "@/widgets/plugin-list";

import { BntRoutes } from "routes/config/routes";
import { routesConfig } from "routes/config/routes-config";

export function PluginsPage() {
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routesConfig.routes[BntRoutes.Settings]?.path,
			label: routesConfig.routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routesConfig.routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routesConfig.routes[BntRoutes.Settings]?.children?.Plugins?.path || "plugins",
			label: routesConfig.routes[BntRoutes.Settings]?.children?.Plugins?.navbarName || CommonStrings.EMPTY_STRING,
			icon: routesConfig.routes[BntRoutes.Settings]?.children?.Plugins?.icon,
		},
	];
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<CardWrapper className="flex-grow scroll">
				<PluginList />
			</CardWrapper>
		</BntStack>
	);
}
