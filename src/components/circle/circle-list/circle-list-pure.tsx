import React, { FC } from "react";

import { useCirclesTableConfig } from "components/circle/circle-list/use-circles-table-config";
import { CommonStrings } from "constants/dictionary";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb/breadcrumbs";
import { CardWrapper } from "@/shared/ui/card-wrapper/card-wrapper";
import { BntReactTable } from "@/shared/ui/react-table/bnt-react-table";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

import { TCircle } from "@/types/model/circle";

export type CircleListPureProps = {
	circles: Array<TCircle>;
};
export const CircleListPure: FC<CircleListPureProps> = ({ circles }) => {
	const { routes } = useBntRoutes();
	const { tableConfig } = useCirclesTableConfig();
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routes[BntRoutes.Settings]?.path,
			label: routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routes[BntRoutes.Settings]?.children?.Circles?.path || "circles",
			label: routes[BntRoutes.Settings]?.children?.Circles?.navbarName || CommonStrings.EMPTY_STRING,
			icon: routes[BntRoutes.Settings]?.children?.Circles?.icon,
		},
	];
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<CardWrapper className="flex-grow scroll">
				<BntReactTable data={circles} columns={tableConfig} />
			</CardWrapper>
		</BntStack>
	);
};
