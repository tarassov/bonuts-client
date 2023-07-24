import { TTableConfig } from "shared/react-table/types";
import { CellContext, createColumnHelper, DeepKeys } from "@tanstack/react-table";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useMemo } from "react";
import { cellFactory } from "shared/react-table/factories/cell-factory";
import { headerFactory } from "shared/react-table/factories/header-factory";
import { ActionCell } from "shared/react-table/cells/action-cell";
import { TBaseModel } from "@/types/model";

export const useTableConfig = <T extends TBaseModel>(config: TTableConfig<T>) => {
	const columnHelper = createColumnHelper<T>();
	const { translate } = useBntTranslate();
	const columnsConfig = useMemo(() => {
		return config.columns.map((x) => {
			const accessor: DeepKeys<T> = x.accessor as DeepKeys<T>;
			return columnHelper.accessor<any, any>(accessor, {
				cell: cellFactory(x),
				header: () => headerFactory(x, (value) => translate(value, { capitalize: true })),
				enableSorting: x.enableSorting,
				enableColumnFilter: x.enableColumnFilter,
				...(x.filterFn ? { filterFn: x.filterFn } : null),
			});
		});
	}, [config, columnHelper]);

	const actionsConfig = useMemo(() => {
		if (config.actions || config.headerActions) {
			const cellActions = config.actions || {};
			const headerActions = config.headerActions || {};
			return [
				columnHelper.accessor<any, any>("actions", {
					cell: (info: CellContext<T, string>) => (
						<ActionCell rowId={info.row.original.id} actions={Object.values(cellActions)} />
					),
					header: Object.values(headerActions).length
						? () => <ActionCell actions={Object.values(headerActions)} />
						: "",
					enableSorting: false,
					enableColumnFilter: false,
				}),
			];
		}
		return [];
	}, [config]);

	const tableConfig = useMemo(() => {
		return [...columnsConfig, ...actionsConfig];
	}, [actionsConfig, columnsConfig]);

	return { tableConfig, columnsConfig, actionsConfig };
};
