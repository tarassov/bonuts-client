import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { Currency } from "constants/currency";
import {
	StatisticsTile,
	StatisticsTileProps,
} from "@/features/reports/component/statistic/statistics-tile";
import { useProfileReports } from "@/features/reports/logic/hooks/useProfileReports";
import reportsTexts from "@/features/reports/localization/reports-texts";

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
