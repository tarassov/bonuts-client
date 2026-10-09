import type { ComponentType } from "react";

import type { StatisticsTileProps } from "../ui/statistics-tile";
import { TotalBalanceTable } from "../ui/total-balance-table";
import { TotalDonutsReceivedReport } from "../ui/total-donuts-received-report";
import { TotalDonutsSentReport } from "../ui/total-donuts-sent-report";

export enum StatisticsDashboardTileId {
	Balance = "balance",
	Sent = "sent",
	Score = "score",
}

export type TStatisticsReportProps = Pick<StatisticsTileProps, "onFullScreenOpen" | "onFullScreenExit" | "fullscreen" | "onlyHeader">;

export const STATISTICS_DASHBOARD_TILES: Array<{
	id: StatisticsDashboardTileId;
	ReportComponent: ComponentType<TStatisticsReportProps>;
}> = [
	{
		id: StatisticsDashboardTileId.Balance,
		ReportComponent: TotalBalanceTable,
	},
	{
		id: StatisticsDashboardTileId.Sent,
		ReportComponent: TotalDonutsSentReport,
	},
	{
		id: StatisticsDashboardTileId.Score,
		ReportComponent: TotalDonutsReceivedReport,
	},
];
