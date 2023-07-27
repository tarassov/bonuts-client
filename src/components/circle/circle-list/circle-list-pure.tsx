import React, { FC } from "react";
import { TBntBreadcrumbItem } from "shared/types/breadcrumbs-types";
import { BntStack } from "shared/stack/stack";
import { BntBreadcrumbs } from "shared/breadcrumb/breadcrumbs";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";
import { BntReactTable } from "shared/react-table/bnt-react-table";
import { routesConfig } from "routes/config/routes-config";
import { BntRoutes } from "routes/config/routes";
import { CommonStrings } from "constants/dictionary";
import { useCirclesTableConfig } from "components/circle/circle-list/use-circles-table-config";
import { TCircle } from "@/types/model/circle";

export type CircleListPureProps = {
	circles: Array<TCircle>;
};
export const CircleListPure: FC<CircleListPureProps> = ({ circles }) => {
	const { tableConfig } = useCirclesTableConfig();
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routesConfig.routes[BntRoutes.Settings]?.path,
			label: routesConfig.routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routesConfig.routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routesConfig.routes[BntRoutes.Settings]?.children?.Circles?.path || "circles",
			label:
				routesConfig.routes[BntRoutes.Settings]?.children?.Circles?.navbarName ||
				CommonStrings.EMPTY_STRING,
			icon: routesConfig.routes[BntRoutes.Settings]?.children?.Circles?.icon,
		},
	];
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<CardWrapper className="flex-grow scroll">
				<BntReactTable columns={tableConfig} data={circles} />
			</CardWrapper>
		</BntStack>
	);
};
