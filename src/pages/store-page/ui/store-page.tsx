import React, { FC, Suspense } from "react";

import { CommonStrings } from "constants/dictionary";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

const StoreManager = React.lazy(() => import("components/store-manager/store-manager"));
export const StorePage: FC = () => {
	const { routes } = useBntRoutes();
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routes[BntRoutes.Settings]?.path,
			label: routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routes[BntRoutes.Settings]?.children?.Store?.path || "store",
			label: routes[BntRoutes.Settings]?.children?.Store?.navbarName || CommonStrings.EMPTY_STRING,
			icon: routes[BntRoutes.Settings]?.children?.Store?.icon,
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
