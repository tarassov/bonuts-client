import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_b } from "services/localization/texts";
import { Currency } from "constants/currency";
import {
	StatisticsTile,
	StatisticsTileProps,
} from "@/features/reports/component/statistic/statistics-tile";
import { useProfileReports } from "@/features/reports/logic/useProfileReports";

export type TotalBalanceTableProps = Pick<
	StatisticsTileProps,
	"onFullScreenOpen" | "onFullScreenExit" | "fullscreen" | "onlyHeader"
>;
export const TotalBalanceTable: FC<TotalBalanceTableProps> = (props) => {
	const { onlyHeader } = props;
	const { objects = [], isLoading } = useProfileReports({ reportType: "show_balance" }, onlyHeader);
	const { t } = useBntTranslate();
	return (
		<StatisticsTile
			totalFieldName={t(texts_b.balance, { capitalize: true })}
			data={objects}
			isLoading={isLoading}
			currency={Currency.coin}
			{...props}
		/>
	);
};
