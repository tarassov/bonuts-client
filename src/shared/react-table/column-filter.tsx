import { Column, Table as ReactTable } from "@tanstack/react-table";
import { BntTextInput } from "shared/input/text-input";
import { Stack } from "@mui/material";

export const ColumnFilter = ({
	column,
	table,
}: {
	column: Column<any, any>;
	table: ReactTable<any>;
}) => {
	const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	return typeof firstValue === "number" ? (
		<Stack direction="row" className="bnt-table-filter">
			<BntTextInput
				type="number"
				value={(columnFilterValue as [number, number])?.[0] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
				}
				placeholder="Min"
			/>
			<BntTextInput
				type="number"
				value={(columnFilterValue as [number, number])?.[1] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
				}
				placeholder="Max"
			/>
		</Stack>
	) : (
		<BntTextInput
			value={(columnFilterValue ?? "") as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder="Search..."
		/>
	);
};
