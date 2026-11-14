import type { ComponentType } from "react";

import type { IDashboardWidgetSizingProps, TDashboardWidgetColumns } from "@/shared/ui/dashboard-widget-card";

import { useProfile } from "@/entities/profile";

import { CurrentWeekStatisticsWidget } from "@/widgets/current-week-statistics";
import { LeaderboardWidget } from "@/widgets/leaderboard";
import { YourStatusWidget } from "@/widgets/your-status";

import { DashboardBalanceWidget } from "./dashboard-balance-widget";
import styles from "./dashboard-page.module.scss";

type TDashboardSocialWidgetId = "leaderboard" | "your_status" | "balance_overview" | "current_week_statistics";

export interface IDashboardSocialWidgetContext {
	hasDistribAccount: boolean;
	hasSelfAccount: boolean;
}

export interface IDashboardSocialSidebarWidgetConfig {
	columns?: TDashboardWidgetColumns;
	id: TDashboardSocialWidgetId;
	isEnabled?: (context: IDashboardSocialWidgetContext) => boolean;
}

const WIDGET_COMPONENTS: Record<TDashboardSocialWidgetId, ComponentType<IDashboardWidgetSizingProps>> = {
	leaderboard: LeaderboardWidget,
	your_status: YourStatusWidget,
	balance_overview: DashboardBalanceWidget,
	current_week_statistics: CurrentWeekStatisticsWidget,
};

const DEFAULT_WIDGET_CONFIG: IDashboardSocialSidebarWidgetConfig[] = [
	{ id: "leaderboard" },
	{ id: "balance_overview", isEnabled: ({ hasDistribAccount, hasSelfAccount }) => hasDistribAccount || hasSelfAccount },
	{ id: "your_status", isEnabled: ({ hasDistribAccount, hasSelfAccount }) => !hasDistribAccount && !hasSelfAccount },
	{ id: "current_week_statistics" },
];

interface IDashboardSocialSidebarProps {
	widgets?: IDashboardSocialSidebarWidgetConfig[];
}

export function DashboardSocialSidebar({ widgets = DEFAULT_WIDGET_CONFIG }: IDashboardSocialSidebarProps) {
	const { profile } = useProfile();

	const widgetContext: IDashboardSocialWidgetContext = {
		hasDistribAccount: Boolean(profile?.distrib_account?.id),
		hasSelfAccount: Boolean(profile?.self_account?.id),
	};

	return (
		<div className={styles.widgetGrid} data-testid="dashboard-social-sidebar">
			{widgets
				.filter((widget) => (widget.isEnabled ? widget.isEnabled(widgetContext) : true))
				.map((widget) => {
					const Widget = WIDGET_COMPONENTS[widget.id];

					return <Widget key={widget.id} columns={widget.columns || 1} />;
				})}
		</div>
	);
}
