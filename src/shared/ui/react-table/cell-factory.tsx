import { StringCell } from "./string-cell";
import type { TTableColumn } from "./types";
import { CellContext } from "@tanstack/react-table";
import { TBaseModel } from "@/types/model";

export const cellFactory = <T extends TBaseModel>(column: TTableColumn<T>) => {
	if (column.cell) return column.cell;
	const cell = (info: CellContext<T, any>) => {
		const { getValue } = info;
		switch (column.cellType) {
			default:
				return <StringCell value={getValue()} />;
		}
	};

	return cell;
};
