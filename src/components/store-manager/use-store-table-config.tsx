import { texts_n } from "services/localization/texts";
import { texts_p } from "services/localization/texts/texts_p";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { ActionType, CellType, HeaderType, TTableConfig } from "shared/ui/react-table/types";
import { useTableConfig } from "shared/ui/react-table/hooks/use-table-config";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { useMemo } from "react";
import { TDonut } from "@/types/model";

export const useStoreTableConfig = (
	onCreateClick?: VoidFunction,
	hideCreateButton: boolean = false
) => {
	const { editDonut } = useDonutUi();
	const { translate } = useBntTranslate();

	const storeConfig: TTableConfig<TDonut> = useMemo(() => {
		return {
			columns: [
				{
					accessor: "name",
					cellType: CellType.CellString,
					enableSorting: true,
					enableColumnFilter: true,
					header: {
						headerType: HeaderType.StringHeader,
						value: translate(texts_n.name, { capitalize: true }),
					},
				},
				{
					accessor: "price",
					cellType: CellType.CellNumber,
					enableSorting: true,
					enableColumnFilter: true,
					header: {
						headerType: HeaderType.StringHeader,
						value: translate(texts_p.price, { capitalize: true }),
					},
				},
			],
			actions: {
				edit: {
					onClick: editDonut,
					actionType: ActionType.Edit,
				},
			},
			headerActions: {
				...(!hideCreateButton
					? {
							create: {
								onClick: onCreateClick,
								actionType: ActionType.Create,
							},
					  }
					: null),
			},
		};
	}, []);

	const { tableConfig } = useTableConfig(storeConfig);
	return { tableConfig };
};
