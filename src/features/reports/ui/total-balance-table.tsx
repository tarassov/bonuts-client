import { FC } from "react";

import { Currency } from "constants/currency";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_b } from "services/localization/texts";

import { useProfileReports } from "../model/useProfileReports";

import { StatisticsTile, StatisticsTileProps } from "./statistics-tile";

export type TotalBalanceTableProps = Pick<StatisticsTileProps, "onFullScreenOpen" | "onFullScreenExit" | "fullscreen" | "onlyHeader">;
export const TotalBalanceTable: FC<TotalBalanceTableProps> = (props) => {
	const { onlyHeader } = props;
	const { fetchNext, hasNext, isFetching, isLoading, objects = [] } = useProfileReports({ reportType: "show_balance" }, onlyHeader);
	const { t } = useBntTranslate();

	return (
		<StatisticsTile
			totalFieldName={t(texts_b.balance, { capitalize: true })}
			data={objects}
			fetchNext={fetchNext}
			hasNext={hasNext}
			isFetching={isFetching}
			isLoading={isLoading}
			currency={Currency.coin}
			{...props}
		/>
	);
};
