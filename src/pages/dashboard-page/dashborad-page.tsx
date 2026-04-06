import { Grid2 as Grid, useMediaQuery, useTheme } from "@mui/material";

import classNames from "classnames";

import { BntStack } from "@/shared/ui/stack";

import { EventList } from "@/entities/event";

import { DashboardSocialSidebar } from "./ui/dashboard-social-sidebar";

export function DashboardPage() {
	const theme = useTheme();
	const matchesDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Grid container flexDirection={matchesDownMd ? "column-reverse" : "row"} gap={matchesDownMd ? 2 : 0} className={classNames({ "height-100": !matchesDownMd })}>
			<Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }} className="height-100">
				<EventList />
			</Grid>
			<Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }}>
				<BntStack direction="row" justifyContent="flex-end" className={classNames("width-100", { "pl-2": !matchesDownMd })}>
					<DashboardSocialSidebar />
				</BntStack>
			</Grid>
		</Grid>
	);
}
