import { TBntBreadcrumbItem } from "shared/types/breadcrumbs-types";
import { routesConfig } from "routes/config/routes-config";
import { BntRoutes } from "routes/config/routes";
import { CommonStrings } from "constants/dictionary";
import { BntBreadcrumbs } from "shared/breadcrumb/breadcrumbs";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";
import React from "react";
import { BntStack } from "shared/stack/stack";
import { TenantEditForm } from "components/tenant/tenant-edit-form";

export const TenantEdit = () => {
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routesConfig.routes[BntRoutes.Settings]?.path,
			label: routesConfig.routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routesConfig.routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routesConfig.routes[BntRoutes.Settings]?.children?.Tenant?.path || "tenant",
			label:
				routesConfig.routes[BntRoutes.Settings]?.children?.Tenant?.navbarName ||
				CommonStrings.EMPTY_STRING,
			icon: routesConfig.routes[BntRoutes.Settings]?.children?.Tenant?.icon,
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
};
