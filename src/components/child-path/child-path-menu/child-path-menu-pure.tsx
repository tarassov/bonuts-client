import { FC } from "react";
import { Grid } from "@mui/material";
import { MenuCard } from "components/child-path/";

export type ChildPathMenuPureProps = {
	routes: Array<TRoute>;
};
export const ChildPathMenuPure: FC<ChildPathMenuPureProps> = ({ routes }) => {
	return (
		<Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
			{routes.map((route) => {
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} key={route.index}>
						<MenuCard route={route} />
					</Grid>
				);
			})}
		</Grid>
	);
};
