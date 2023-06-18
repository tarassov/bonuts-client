import React, { FC, useState } from "react";
import {
	// Table,
	useReactTable,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
	SortingState,
} from "@tanstack/react-table";

import classnames from "classnames";
import { matchSorter } from "match-sorter";

import { useBntTranslate } from "hooks/use-bnt-translate";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { FormControl, Grid, MenuItem, Select, Stack, TableCell, TableHead } from "@mui/material";
import { fuzzyFilter } from "shared/react-table/filters";
import { ColumnFilter } from "shared/react-table/column-filter";
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import { texts_p } from "services/localization/texts/texts_p";
import { texts_n } from "services/localization/texts";
import { BntTransparentButton } from "shared/buttons/transparent-button";

function fuzzyTextFilterFn(rows: Array<any>, id: number, filterValue: string) {
	return matchSorter<any>(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

// Our table component
export const BntReactTablePure: FC<{
	columns: Array<any>;
	data: Array<any>;
	className?: string;
	pageSize?: number;
}> = ({ columns, data, className, pageSize = 5 }) => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		initialState: { pagination: { pageSize, pageIndex: 0 } },
		state: {
			columnFilters,
			globalFilter,
			sorting,
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		onSortingChange: setSorting,
	});

	const { translate } = useBntTranslate();

	const numberOfRowsData = [5, 10, 20, 25, 50, 100];
	return (
		<TableContainer sx={{ boxShadow: "none" }} className={className}>
			<Table>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup, key) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((columnHeader) => (
								<TableCell
									component="th"
									scope="row"
									key={columnHeader.id}
									colSpan={columnHeader.colSpan}
									className={classnames(
										"bnt-table-th bnt-table-header",
										`-sort-${columnHeader.column.getIsSorted()}`,
										{
											"-cursor-pointer": headerGroup.headers.length - 1 !== key,
										}
									)}
								>
									{columnHeader.isPlaceholder ? null : (
										<Stack
											direction="row"
											alignItems="center"
											gap={2}
											className="sorter"
											onClick={columnHeader.column.getToggleSortingHandler()}
										>
											{flexRender(columnHeader.column.columnDef.header, columnHeader.getContext())}
											{columnHeader.column.getCanSort() && (
												<Stack className={classnames(`sort-${columnHeader.column.getIsSorted()}`)}>
													<ArrowDropUpOutlined
														className={classnames("sort-icon", "sort-icon__asc")}
													/>
													<ArrowDropDownOutlined
														className={classnames("sort-icon", "sort-icon__desc")}
													/>
												</Stack>
											)}
										</Stack>
									)}
									{columnHeader.column.getCanFilter() ? (
										<div>
											<ColumnFilter column={columnHeader.column} table={table} />
										</div>
									) : null}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map((row, i) => (
						<TableRow
							key={row.id}
							className={classnames(
								"bnt-table-tr",
								{ "bnt-table-tr-odd": i % 2 === 0 },
								{ "bnt-table-tr-even": i % 2 === 1 }
							)}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			{data.length ? (
				<div className="bnt-table-footer">
					<Stack
						direction="row"
						gap={2}
						justifyContent="space-between"
						alignItems="stretch"
						flexWrap={{ xs: "wrap", sm: "nowrap" }}
					>
						<BntTransparentButton
							disabled={!table.getCanPreviousPage()}
							className="bnt-navigation-button"
							onClick={() => table.previousPage()}
						>
							{translate(texts_p.previous, { capitalize: true })}
						</BntTransparentButton>
						<Grid container gap={2} justifyContent="center">
							<Grid item xs={12} sm={5} md={4}>
								<FormControl fullWidth>
									<Select
										value={table.getState().pagination.pageIndex}
										onChange={(event) => {
											table.setPageIndex(Number(event.target.value));
										}}
										inputProps={{
											name: "pageSelect",
											id: "page-select",
										}}
										variant="standard"
									>
										{table.getPageOptions().map((prop, key) => {
											return (
												<MenuItem key={prop} value={prop}>
													{translate("Page")} {key + 1}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={5} md={4}>
								<FormControl fullWidth>
									<Select
										value={table.getState().pagination.pageSize}
										onChange={(event) => {
											table.setPageSize(Number(event.target.value));
										}}
										inputProps={{
											name: "numberOfRows",
											id: "number-of-rows",
										}}
										variant="standard"
									>
										{numberOfRowsData.map((prop) => {
											return (
												<MenuItem key={prop} value={prop}>
													{prop} {translate("rows")}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<BntTransparentButton
							disabled={!table.getCanNextPage()}
							className="bnt-navigation-button"
							onClick={() => table.nextPage()}
						>
							{translate(texts_n.next, { capitalize: true })}
						</BntTransparentButton>
					</Stack>
				</div>
			) : null}
		</TableContainer>
	);
};
