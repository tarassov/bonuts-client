import { CommonStrings } from "constants/dictionary";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

import { useCirclesPage } from "../model/use-circles-page";

import { CirclesPageView } from "./circles-page-view";

export function CirclesPage() {
	const { routes } = useBntRoutes();
	const { circles, filteredCircles, handleCreate, handleDelete, handleEdit, query, setQuery } = useCirclesPage();
	const settingsRoute = routes[BntRoutes.Settings];
	const circlesRoute = settingsRoute?.children?.Circles;
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: settingsRoute?.path,
			label: settingsRoute?.navbarName || "settings",
			icon: settingsRoute?.icon,
		},
		{
			key: circlesRoute?.path || "circles",
			label: circlesRoute?.navbarName || CommonStrings.EMPTY_STRING,
			icon: circlesRoute?.icon,
		},
	];

	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<div className="flex-grow scroll">
				<CirclesPageView circles={circles} filteredCircles={filteredCircles} onCreate={handleCreate} onDelete={handleDelete} onEdit={handleEdit} onQueryChange={setQuery} query={query} />
			</div>
		</BntStack>
	);
}
