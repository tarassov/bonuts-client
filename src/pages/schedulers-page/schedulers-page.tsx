import React from "react";
import { BntRoutes } from "routes/config/routes";
import { routesConfig } from "routes/config/routes-config";
import { TBntBreadcrumbItem } from "shared/ui/types/breadcrumbs-types";

import { BntBreadcrumbs } from "shared/ui/breadcrumb/breadcrumbs";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "shared/ui/stack";

import { CommonStrings } from "constants/dictionary";

import { TenantSchedulers } from "@/widgets/scheduler";

export function SchedulersPage() {
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routesConfig.routes[BntRoutes.Settings]?.path,
			label: routesConfig.routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routesConfig.routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routesConfig.routes[BntRoutes.Settings]?.children?.Schedulers?.path || "schedulers",
			label: routesConfig.routes[BntRoutes.Settings]?.children?.Schedulers?.navbarName || CommonStrings.EMPTY_STRING,
			icon: routesConfig.routes[BntRoutes.Settings]?.children?.Schedulers?.icon,
		},
	];
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<CardWrapper className="flex-grow scroll">
				<TenantSchedulers />
			</CardWrapper>
		</BntStack>
	);
}
