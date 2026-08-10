import type { FC } from "react";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

import { useStorePage } from "../model/use-store-page";

import { StorePageView } from "./store-page-view";
import { texts_s } from "@/services/localization/texts";

export const StorePage: FC = () => {
	const { routes } = useBntRoutes();
	const { donuts, handleToggleActive, showCreateDonutModal } = useStorePage();
	const settingsRoute = routes[BntRoutes.Settings];
	const storeRoute = settingsRoute?.children?.Store;
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: settingsRoute?.path,
			label: settingsRoute?.navbarName || texts_s.settings,
			icon: settingsRoute?.icon,
		},
		{
			key: storeRoute?.path || "store",
			label: storeRoute?.navbarName || texts_s.store_showcase,
			icon: storeRoute?.icon,
		},
	];
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<div className="flex-grow scroll">
				<StorePageView donuts={donuts} onCreateClick={showCreateDonutModal} onToggleActive={handleToggleActive} />
			</div>
		</BntStack>
	);
};
