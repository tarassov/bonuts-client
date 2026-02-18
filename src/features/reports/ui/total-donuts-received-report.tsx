import { FC } from "react";

import { Currency } from "constants/currency";
import { useBntTranslate } from "hooks/use-bnt-translate";

import reportsTexts from "../config/reports-texts";
import { useProfileReports } from "../model/useProfileReports";

import { StatisticsTile, StatisticsTileProps } from "./statistics-tile";

export type TTotalDonutsReceivedReportProps = Pick<
	StatisticsTileProps,
	"onFullScreenOpen" | "onFullScreenExit" | "fullscreen" | "onlyHeader"
>;
export const TotalDonutsReceivedReport: FC<TTotalDonutsReceivedReportProps> = (props) => {
	const { onlyHeader } = props;
	const { objects = [], isLoading } = useProfileReports({ reportType: "show_score" }, onlyHeader);
	const { t } = useBntTranslate();
	return (
		<StatisticsTile
			totalFieldName={t(reportsTexts.total_donuts_received, { capitalize: true })}
			data={objects}
			isLoading={isLoading}
			currency={Currency.donut}
			{...props}
		/>
	);
};
