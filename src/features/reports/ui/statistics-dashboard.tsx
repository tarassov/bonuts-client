import { useEffect, useState } from "react";
import { Grid2 as Grid, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

import classnames from "classnames";

import { BntBox } from "@/shared/ui/box";

import { TotalBalanceTable } from "./total-balance-table";
import { TotalDonutsReceivedReport } from "./total-donuts-received-report";
import { TotalDonutsSentReport } from "./total-donuts-sent-report";

export const StatisticsDashboard = () => {
	const matchesSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
	type types = "balance" | "sent" | "score";
	const [fullscreenValue, setFullScreenValue] = useState<types | undefined>();

	useEffect(() => {
		if (matchesSmUp) setFullScreenValue(undefined);
	}, [matchesSmUp]);
	const getScreenProps = (name: string) => (fullscreenValue !== name ? { xs: 12, sm: 12, md: 5, lg: 4 } : { xs: 12, sm: 12, md: 12, lg: 12 });
	const getDisplayProps = (name: string): SystemStyleObject<Theme> => {
		if (!matchesSmUp) {
			return {};
		}
		return fullscreenValue !== name
			? !fullscreenValue
				? { position: "static", zIndex: 50 }
				: {
						position: "static",
						zIndex: 50,
						opacity: "0.2",
						transition: "opacity 0.5s ease-out",
					}
			: {
					position: "absolute",
					width: "90%",
					left: "50%",
					transform: "translate(-50%, 0)",
					top: "20px",
					zIndex: 100,
					transition: "max-width 0.5s ease-out,opacity 0.5s ease-out",
				};
	};
	const getMaxHeight = (name: string): SystemStyleObject<Theme> => {
		if (matchesSmUp) {
			return fullscreenValue === name
				? { maxHeight: "100%" }
				: {
						maxHeight: "40%",
					};
		}
		return fullscreenValue === name ? { minHeight: "200px" } : { maxHeight: "100px" };
	};

	return (
		<div className="position-relative height-100">
			<Grid container className={classnames("p-2", { "height-100": matchesSmUp })} alignItems="stretch" gap={4} sx={{ position: "relative" }} onClick={() => setFullScreenValue(undefined)}>
				<Grid size={getScreenProps("balance")} sx={[getMaxHeight("balance"), getDisplayProps("balance")]}>
					<TotalBalanceTable
						onFullScreenOpen={() => setFullScreenValue("balance")}
						onFullScreenExit={() => setFullScreenValue(undefined)}
						fullscreen={fullscreenValue === "balance"}
						onlyHeader={!matchesSmUp && fullscreenValue !== "balance"}
					/>
				</Grid>
				<Grid size={getScreenProps("sent")} sx={[getMaxHeight("sent"), getDisplayProps("sent")]}>
					<TotalDonutsSentReport
						onFullScreenOpen={() => setFullScreenValue("sent")}
						onFullScreenExit={() => setFullScreenValue(undefined)}
						fullscreen={fullscreenValue === "sent"}
						onlyHeader={!matchesSmUp && fullscreenValue !== "sent"}
					/>
				</Grid>
				<Grid size={getScreenProps("score")} sx={[getMaxHeight("score"), getDisplayProps("score")]}>
					<TotalDonutsReceivedReport
						onFullScreenOpen={() => setFullScreenValue("score")}
						onFullScreenExit={() => setFullScreenValue(undefined)}
						fullscreen={fullscreenValue === "score"}
						onlyHeader={!matchesSmUp && fullscreenValue !== "score"}
					/>
				</Grid>
			</Grid>
			{fullscreenValue && matchesSmUp ? <BntBox onClick={() => setFullScreenValue(undefined)} sx={{ position: "absolute", width: "100%", height: "100%", zIndex: 80, top: 0, left: 0 }} /> : null}
		</div>
	);
};
