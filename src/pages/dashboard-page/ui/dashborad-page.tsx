import { Grid2 as Grid } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";

import { EventList } from "@/entities/event";

import styles from "./dashboard-page.module.scss";
import { DashboardSocialSidebar } from "./dashboard-social-sidebar";

export function DashboardPage() {
	return (
		<div className={styles.page} data-testid="dashboard-page">
			<Grid container className={styles.layout}>
				<Grid size={{ xs: 12, md: 7 }} className={styles.feed} data-testid="dashboard-event-feed">
					<EventList />
				</Grid>
				<Grid size={{ xs: 12, md: 5 }} className={styles.sidebarColumn} data-testid="dashboard-sidebar-column">
					<BntStack direction="row" justifyContent="flex-end" className={styles.sidebar}>
						<DashboardSocialSidebar />
					</BntStack>
				</Grid>
			</Grid>
		</div>
	);
}
