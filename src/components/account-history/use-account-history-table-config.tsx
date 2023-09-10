import { useBntTranslate } from "hooks/use-bnt-translate";
import { useMemo } from "react";
import { texts_h } from "services/localization/texts/texts_h";
import { createColumnHelper } from "@tanstack/react-table";
import { BntStyledOperationText } from "components/opearation-text/styled-operation-text";
import { TOperation } from "@/types/model/operation";

export const useAccountHistoryTableConfig = () => {
	const { translate } = useBntTranslate();
	const columnHelper = createColumnHelper<TOperation & { actions?: any }>();

	const tableConfig = useMemo(() => {
		return [
			columnHelper.accessor("to_profile.name", {
				cell: (info) =>
					info ? <BntStyledOperationText operation={info?.row.original} showDateTime /> : <div />,
				header: translate(texts_h.history, { capitalize: true }),
				footer: (info) => info.column.id,
				enableSorting: true,
				// filterFn: requestFilter,
			}),
		];
	}, []);

	return { tableConfig };
};
