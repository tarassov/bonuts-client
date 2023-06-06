import { Column, Table as ReactTable } from "@tanstack/react-table";
import { BntTextInput } from "shared/input/text-input";
import { Stack } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_s } from "services/localization/texts";
import { texts_r } from "services/localization/texts/texts_r";

export const ColumnFilter = ({
	column,
	table,
}: {
	column: Column<any, any>;
	table: ReactTable<any>;
}) => {
	const count = table.getPreFilteredRowModel().flatRows.length;
	const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
	const { translate } = useBntTranslate();

	const columnFilterValue = column.getFilterValue();

	return typeof firstValue === "number" ? (
		<Stack direction="row" className="bnt-table-filter" gap={2}>
			<BntTextInput
				type="number"
				value={(columnFilterValue as [number, number])?.[0] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
				}
				placeholder="Min"
				variant="standard"
			/>
			<BntTextInput
				type="number"
				value={(columnFilterValue as [number, number])?.[1] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
				}
				placeholder="Max"
				variant="standard"
			/>
		</Stack>
	) : (
		<BntTextInput
			className="bnt-table-filter"
			value={(columnFilterValue ?? "") as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder={`${translate(texts_s.search, { capitalize: true })}...${count} ${translate(
				texts_r.records,
				{ count }
			)}`}
			variant="standard"
		/>
	);
};
