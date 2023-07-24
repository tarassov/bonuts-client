import { texts_n } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { ActionType, CellType, HeaderType, TTableConfig } from "shared/react-table/types";
import { useTableConfig } from "shared/react-table/hooks/use-table-config";
import { useMemo } from "react";
import { useCircleUi } from "logic/ui/use-circle-ui";
import { useCircle } from "logic/hooks/cirlce/use-circle";
import { TCircle } from "@/types/model";

export const useCirclesTableConfig = () => {
	const { translate } = useBntTranslate();
	const { showCreateCircleModal } = useCircleUi();
	const { deleteCircle } = useCircle();

	const storeConfig: TTableConfig<TCircle> = useMemo(() => {
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
			],
			actions: {
				edit: {
					onClick: () => {},
					actionType: ActionType.Edit,
				},
				delete: {
					onClick: (id) => deleteCircle(id),
					actionType: ActionType.Delete,
				},
			},
			headerActions: {
				create: {
					onClick: showCreateCircleModal,
					actionType: ActionType.Create,
				},
			},
		};
	}, []);

	const { tableConfig } = useTableConfig(storeConfig);
	return { tableConfig };
};
