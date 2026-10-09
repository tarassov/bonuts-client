import { useEffect, useState } from "react";
import { Grid2 as Grid, useMediaQuery, useTheme } from "@mui/material";

import classNames from "classnames";

import { BntBox } from "@/shared/ui/box";

import { STATISTICS_DASHBOARD_TILES, StatisticsDashboardTileId, type TStatisticsReportProps } from "../constants/statistics-dashboard-constants";

import styles from "./statistics-dashboard.module.scss";

export const StatisticsDashboard = () => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const [fullscreenTileId, setFullscreenTileId] = useState<StatisticsDashboardTileId | undefined>();

	useEffect(() => {
		if (isDesktop) {
			setFullscreenTileId(undefined);
		}
	}, [isDesktop]);

	const closeFullscreen = () => setFullscreenTileId(undefined);
	const openFullscreen = (tileId: StatisticsDashboardTileId) => setFullscreenTileId(tileId);

	return (
		<div className={styles.root}>
			<Grid container spacing={2} className={classNames(styles.grid, { [styles.desktopGrid]: isDesktop })}>
				{STATISTICS_DASHBOARD_TILES.map(({ id, ReportComponent }) => {
					const isFullscreen = fullscreenTileId === id;
					const reportProps: TStatisticsReportProps = {
						onFullScreenOpen: () => openFullscreen(id),
						onFullScreenExit: closeFullscreen,
						fullscreen: isFullscreen,
						onlyHeader: !isDesktop && !isFullscreen,
					};

					return (
						<Grid key={id} size={{ xs: 12, md: 12, lg: 6 }} className={classNames({ [styles.desktopGridItem]: isDesktop })}>
							<div
								className={classNames(styles.tile, {
									[styles.desktopTile]: isDesktop,
									[styles.mobileTile]: !isDesktop,
									[styles.fullscreenTile]: isDesktop && isFullscreen,
									[styles.mobileFullscreenTile]: !isDesktop && isFullscreen,
									[styles.dimmedTile]: isDesktop && Boolean(fullscreenTileId) && !isFullscreen,
								})}
							>
								<ReportComponent {...reportProps} />
							</div>
						</Grid>
					);
				})}
			</Grid>
			{fullscreenTileId && isDesktop ? <BntBox className={styles.backdrop} onClick={closeFullscreen} /> : null}
		</div>
	);
};
