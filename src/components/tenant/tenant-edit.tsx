import React from "react";

import { TenantEditForm } from "components/tenant/tenant-edit-form";
import { CommonStrings } from "constants/dictionary";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb/breadcrumbs";
import { CardWrapper } from "@/shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

export function TenantEdit() {
	const { routes } = useBntRoutes();
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routes[BntRoutes.Settings]?.path,
			label: routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routes[BntRoutes.Settings]?.children?.Tenant?.path || "tenant",
			label: routes[BntRoutes.Settings]?.children?.Tenant?.navbarName || CommonStrings.EMPTY_STRING,
			icon: routes[BntRoutes.Settings]?.children?.Tenant?.icon,
		},
	];

	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<CardWrapper className="flex-grow scroll p-4">
				<TenantEditForm />
			</CardWrapper>
		</BntStack>
	);
}
