import { useMemo } from "react";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_c, texts_e, texts_n } from "services/localization/texts";

import { useTableConfig } from "@/shared/ui/react-table/hooks/use-table-config";
import { ActionType, CellType, HeaderType, TTableConfig } from "@/shared/ui/react-table/types";

import { useModal } from "@/entities/modal";

import { useCircle } from "logic/hooks/cirlce/use-circle";
import { useCircleUi } from "logic/ui/use-circle-ui";
import { TCircle } from "@/types/model";

export const useCirclesTableConfig = () => {
	const { translate } = useBntTranslate();
	const { showCreateCircleModal } = useCircleUi();
	const { deleteCircle } = useCircle();
	const { ConfirmationModal, EditCircle } = useModal();

	const onDelete = (id?: number) => {
		if (id) {
			ConfirmationModal.show({
				text: translate(texts_a.are_you_sure_to_delete, { capitalize: true }),
				onSubmit: () => deleteCircle(id),
				title: translate(texts_c.confirmation, { capitalize: true }),
			});
		}
	};

	const onEdit = (id?: number) => {
		if (id) {
			EditCircle.show({
				title: translate(texts_e.edit, { capitalize: true }),
				circleId: id,
			});
		}
	};

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
					onClick: (id) => onEdit(id),
					actionType: ActionType.Edit,
				},
				delete: {
					onClick: (id) => onDelete(id),
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
