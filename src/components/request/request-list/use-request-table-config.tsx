import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { RequestContentCell } from "components/request/request-list/request-content-cell";
import { RequestActionsCell } from "components/request/request-list/request-actions-cell";
import { emptyFunction } from "utils/empty-function";
import { TRequest } from "@/types/model/request";

export const useRequestTableConfig = () => {
	const columnHelper = createColumnHelper<TRequest & { actions: any }>();
	const tableConfig = useMemo(
		() => [
			columnHelper.accessor("donut", {
				cell: (info) => (
					<RequestContentCell
						donut={info.row.original.donut}
						profile={info.row.original.profile}
						datetime={info.row.original.created_at}
					/>
				),
				header: "Requests",
				footer: (info) => info.column.id,
				enableSorting: true,
			}),
			columnHelper.accessor("actions", {
				cell: () => (
					<RequestActionsCell onEditClick={emptyFunction} onRollbackClick={emptyFunction} />
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
