import { FC } from "react";
import { Grid } from "@mui/material";
import { MenuCard } from "components/child-path/";
import { BntRoutes } from "routes/config/routes";

export type ChildPathMenuPureProps = {
	routes: Array<TRoute<BntRoutes>>;
	className?: string;
};
export const ChildPathMenuPure: FC<ChildPathMenuPureProps> = ({ routes, className }) => {
	return (
		<Grid
			className={className}
			container
			rowSpacing={{ xs: 3, lg: 3 }}
			columnSpacing={{ xs: 2, lg: 3, xl: 4 }}
		>
			{routes.map((route) => {
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={route.index}>
						<MenuCard route={route} />
					</Grid>
				);
			})}
		</Grid>
	);
};
