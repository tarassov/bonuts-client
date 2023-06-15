import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { RequestContentCell } from "components/request/request-list/request-content-cell";
import { RequestActionsCell } from "components/request/request-list/request-actions-cell";
import { requestFilter } from "components/request/request-list/request-filter";
import { texts_r } from "services/localization/texts/texts_r";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { emptyFunction } from "utils/empty-function";
import { TRequest } from "@/types/model/request";

export const useRequestTableConfig = (args: {
	onRollback?: (id: number) => void;
	onCheck?: (id: number) => void;
	hideActions?: boolean;
}) => {
	const { onRollback = emptyFunction, onCheck = emptyFunction, hideActions = false } = args;
	const { translate } = useBntTranslate();
	const columnHelper = createColumnHelper<TRequest & { actions?: any }>();
	const tableConfig = useMemo(
		() => [
			columnHelper.accessor("donut.name", {
				cell: (info) => (
					<RequestContentCell
						donut={info.row.original.donut}
						profile={info.row.original.profile}
						datetime={info.row.original.created_at}
					/>
				),
				header: translate(texts_r.requests, { capitalize: true }),
				footer: (info) => info.column.id,
				enableSorting: true,
				filterFn: requestFilter,
			}),
			columnHelper.accessor("actions", {
				cell: (info) => (
					<RequestActionsCell
						hideEdit={hideActions}
						hideRollback={hideActions}
						onCheckClick={() => onCheck(info.row.original.id)}
						onRollbackClick={() => onRollback(info.row.original.id)}
					/>
				),
				header: "",
				enableSorting: false,
				enableColumnFilter: false,
			}),
		],
		[]
	);

	return { tableConfig };
};
