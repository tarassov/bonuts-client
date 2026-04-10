import type { ComponentType } from "react";
import { Box, styled } from "@mui/material";

import type { IDashboardWidgetSizingProps, TDashboardWidgetColumns } from "@/shared/ui/dashboard-widget-card";

import { useProfile } from "@/entities/profile";

import { BalanceOverviewWidget } from "@/widgets/balance-overview";
import { CurrentWeekStatisticsWidget } from "@/widgets/current-week-statistics";
import { LeaderboardWidget } from "@/widgets/leaderboard";
import { YourStatusWidget } from "@/widgets/your-status";

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

const SidebarGrid = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "grid",
	gridTemplateColumns: "1fr",
	gap: theme.spacing(2),
	[theme.breakpoints.up("lg")]: {
		gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		alignItems: "stretch",
	},
}));

const WIDGET_COMPONENTS: Record<TDashboardSocialWidgetId, ComponentType<IDashboardWidgetSizingProps>> = {
	leaderboard: LeaderboardWidget,
	your_status: YourStatusWidget,
	balance_overview: BalanceOverviewWidget,
	current_week_statistics: CurrentWeekStatisticsWidget,
};

const DEFAULT_WIDGET_CONFIG: IDashboardSocialSidebarWidgetConfig[] = [
	{ id: "leaderboard", columns: 1 },
	{ id: "your_status", columns: 1 },
	{ id: "current_week_statistics", columns: 1 },
	{
		id: "balance_overview",
		columns: 1,
		isEnabled: ({ hasDistribAccount, hasSelfAccount }) => hasDistribAccount || hasSelfAccount,
	},
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
		<SidebarGrid>
			{widgets
				.filter((widget) => (widget.isEnabled ? widget.isEnabled(widgetContext) : true))
				.map((widget) => {
					const Widget = WIDGET_COMPONENTS[widget.id];

					return <Widget key={widget.id} columns={widget.columns || 1} />;
				})}
		</SidebarGrid>
	);
}
