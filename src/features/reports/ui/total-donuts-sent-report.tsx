import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { Currency } from "constants/currency";
import { StatisticsTile, StatisticsTileProps } from "./statistics-tile";
import { useProfileReports } from "../model/useProfileReports";
import reportsTexts from "../config/reports-texts";

export type TotalDonutsSentReportProps = Pick<
	StatisticsTileProps,
	"onFullScreenOpen" | "onFullScreenExit" | "fullscreen" | "onlyHeader"
>;
export const TotalDonutsSentReport: FC<TotalDonutsSentReportProps> = (props) => {
	const { onlyHeader } = props;
	const { objects = [], isLoading } = useProfileReports({ reportType: "show_sent" }, onlyHeader);
	const { t } = useBntTranslate();
	return (
		<StatisticsTile
			totalFieldName={t(reportsTexts.total_donuts_sent, { capitalize: true })}
			data={objects}
			isLoading={isLoading}
			currency={Currency.donut}
			{...props}
		/>
	);
};
