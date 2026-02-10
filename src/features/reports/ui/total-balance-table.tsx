import { FC } from "react";

import { Currency } from "constants/currency";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_b } from "services/localization/texts";

import { useProfileReports } from "../model/useProfileReports";

import { StatisticsTile, StatisticsTileProps } from "./statistics-tile";

export type TotalBalanceTableProps = Pick<StatisticsTileProps, "onFullScreenOpen" | "onFullScreenExit" | "fullscreen" | "onlyHeader">;
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
