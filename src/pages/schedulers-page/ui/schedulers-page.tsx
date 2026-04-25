import React from "react";

import { CommonStrings } from "constants/dictionary";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

import { TenantSchedulers } from "@/widgets/scheduler";

export function SchedulersPage() {
	const { routes } = useBntRoutes();
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routes[BntRoutes.Settings]?.path,
			label: routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routes[BntRoutes.Settings]?.children?.Schedulers?.path || "schedulers",
			label: routes[BntRoutes.Settings]?.children?.Schedulers?.navbarName || CommonStrings.EMPTY_STRING,
			icon: routes[BntRoutes.Settings]?.children?.Schedulers?.icon,
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
