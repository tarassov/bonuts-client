import { BntStack } from "@/shared/ui/stack";

import { EventList } from "@/entities/event";

import styles from "./dashboard-page.module.scss";
import { DashboardSocialSidebar } from "./dashboard-social-sidebar";

export function DashboardPage() {
	return (
		<div className={styles.page} data-testid="dashboard-page">
			<div className={styles.layout}>
				<div className={styles.feed} data-testid="dashboard-event-feed">
					<EventList />
				</div>
				<div className={styles.sidebarColumn} data-testid="dashboard-sidebar-column">
					<BntStack direction="row" justifyContent="flex-end" className={styles.sidebar}>
						<DashboardSocialSidebar />
					</BntStack>
				</div>
			</div>
		</div>
	);
}
