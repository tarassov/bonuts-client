import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";

import { BalanceOverviewWidget } from "@/widgets/balance-overview";
import { YourStatusWidget } from "@/widgets/your-status";

export function DashboardBalanceWidget(props: IDashboardWidgetSizingProps) {
	return (
		<BalanceOverviewWidget {...props}>
			<YourStatusWidget isEmbedded />
		</BalanceOverviewWidget>
	);
}
