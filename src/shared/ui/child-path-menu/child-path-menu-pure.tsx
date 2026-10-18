import type { FC } from "react";
import { Grid } from "@mui/material";

import type { BntRoutes } from "@/shared/config/routes";

import { MenuCard } from "./menu-card";

export type TChildPathMenuPureProps = {
	routes: Array<TRoute<BntRoutes>>;
	className?: string;
};

export const ChildPathMenuPure: FC<TChildPathMenuPureProps> = ({ routes, className }) => {
	return (
		<Grid className={className} container rowSpacing={{ xs: 3, lg: 3 }} columnSpacing={{ xs: 2, lg: 3, xl: 4 }}>
			{routes.map((route) => {
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={route.path}>
						<MenuCard route={route} />
					</Grid>
				);
			})}
		</Grid>
	);
};
