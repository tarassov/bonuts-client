import { useBntTranslate } from "hooks/use-bnt-translate";
import { CellType, HeaderType, TTableConfig } from "shared/ui/react-table/types";
import { useTableConfig } from "shared/ui/react-table/hooks/use-table-config";
import { useMemo } from "react";
import { BntProfileButton } from "components/buttons/profile-button";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { Typography } from "@mui/material";
import { Currency } from "constants/currency";
import { useIcons } from "hooks/use-icons";
import { BntStack } from "shared/ui/stack/stack";
import { DonutSmallOutlined } from "@mui/icons-material";
import { TProfile } from "@/types/model";
import reportsTexts from "@/features/reports/localization/reports-texts";

export const useStatisticsTableConfig = (totalFieldName: string, currency?: Currency) => {
	const { translate } = useBntTranslate();
	const { showEmployeeModal } = useEmployeeUi();
	const { BonutsCurrency } = useIcons({ width: "10px", height: "10px" });

	const storeConfig: TTableConfig<TProfile> = useMemo(() => {
		return {
			columns: [
				{
					accessor: "name",
					cellType: CellType.CellString,
					enableSorting: false,
					enableColumnFilter: false,
					cell: (info) =>
						info ? (
							<BntProfileButton
								profile={info.row.original}
								onClick={() => showEmployeeModal(info?.row.original.id)}
								className="pl-4"
							/>
						) : (
							<span />
						),
					header: {
						headerType: HeaderType.StringHeader,
						value: translate(reportsTexts.employee_name, { capitalize: true }),
					},
				},
				{
					accessor: "score_total",
					cellType: CellType.CellString,
					enableSorting: false,
					enableColumnFilter: false,
					cell: (info) =>
						info ? (
							<Typography variant="body2">
								{info?.row.original.score_total !== undefined && (
									<BntStack direction="row" alignItems="center">
										{info?.row.original.score_total}
										{currency ? (
											currency === Currency.coin ? (
												<BonutsCurrency />
											) : (
												<DonutSmallOutlined color="primary" sx={{ width: "16px" }} />
											)
										) : null}
									</BntStack>
								)}
							</Typography>
						) : (
							<span />
						),
					header: {
						headerType: HeaderType.StringHeader,
						value: totalFieldName,
					},
				},
			],
		};
	}, [totalFieldName, currency]);

	const { tableConfig } = useTableConfig(storeConfig);
	return { tableConfig };
};
