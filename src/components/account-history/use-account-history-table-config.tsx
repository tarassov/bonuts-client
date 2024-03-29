import { useBntTranslate } from "hooks/use-bnt-translate";
import { useMemo } from "react";
import { texts_h } from "services/localization/texts/texts_h";
import { createColumnHelper } from "@tanstack/react-table";
import { BntStyledOperationText } from "components/opearation-text/styled-operation-text";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { TOperation } from "@/types/model/operation";

export const useAccountHistoryTableConfig = () => {
	const { translate } = useBntTranslate();
	const columnHelper = createColumnHelper<TOperation & { actions?: any }>();
	const { showEmployeeModal } = useEmployeeUi();

	const tableConfig = useMemo(() => {
		return [
			columnHelper.accessor("to_profile.name", {
				cell: (info) =>
					info ? (
						<BntStyledOperationText
							className="pl-2"
							operation={info?.row.original}
							showDateTime
							onFromProfileClick={(operation) => {
								if (operation.from_profile) showEmployeeModal(operation.from_profile.id);
							}}
							onToProfileClick={(operation) => {
								if (operation.to_profile) showEmployeeModal(operation.to_profile.id);
							}}
						/>
					) : (
						<div />
					),

				header: translate(texts_h.history, { capitalize: true }),
				footer: (info) => info.column.id,
				enableSorting: false,
				enableColumnFilter: false,
				// filterFn: requestFilter,
			}),
		];
	}, []);

	return { tableConfig };
};
