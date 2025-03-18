import React, { FC, Suspense } from "react";
import { BntRoutes } from "routes/config/routes";
import { routesConfig } from "routes/config/routes-config";
import { TBntBreadcrumbItem } from "shared/ui/types/breadcrumbs-types";

import { BntBreadcrumbs } from "shared/ui/breadcrumb/breadcrumbs";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { BntStack } from "shared/ui/stack/stack";

import { CommonStrings } from "constants/dictionary";

const StoreManager = React.lazy(() => import("components/store-manager/store-manager"));
export const StorePage: FC = () => {
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routesConfig.routes[BntRoutes.Settings]?.path,
			label: routesConfig.routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routesConfig.routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routesConfig.routes[BntRoutes.Settings]?.children?.Store?.path || "store",
			label:
				routesConfig.routes[BntRoutes.Settings]?.children?.Store?.navbarName ||
				CommonStrings.EMPTY_STRING,
			icon: routesConfig.routes[BntRoutes.Settings]?.children?.Store?.icon,
		},
	];
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<CardWrapper className="flex-grow scroll">
				<Suspense fallback={<div>Loading...</div>}>
					<StoreManager />
				</Suspense>
			</CardWrapper>
		</BntStack>
	);
};
