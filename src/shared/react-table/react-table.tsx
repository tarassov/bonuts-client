/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-file @typescript-eslint/no-unused-vars

import React, { FC, useReducer, useState } from "react";
import {
	Column,
	// Table,
	useReactTable,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	sortingFns,
	getSortedRowModel,
	FilterFn,
	SortingFn,
	ColumnDef,
	flexRender,
	FilterFns,
} from "@tanstack/react-table";

import { RankingInfo, rankItem, compareItems } from "@tanstack/match-sorter-utils";
import classnames from "classnames";
import { matchSorter } from "match-sorter";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTextInput } from "shared/input/text-input";
import { DefaultColumnFilter } from "shared/react-table/default-column-filter";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, TableCell, TableHead } from "@mui/material";
import { fuzzyFilter } from "shared/react-table/filters";

function fuzzyTextFilterFn(rows: Array<any>, id: number, filterValue: string) {
	return matchSorter<any>(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

// Our table component
export const ReactTable: FC<{ columns: Array<any>; data: Array<any> }> = ({ columns, data }) => {
	const [numberOfRows, setNumberOfRows] = React.useState(10);
	const [pageSelect, handlePageSelect] = React.useState(0);
	const rerender = useReducer(() => ({}), {})[1];

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");

	const table = useReactTable({
		data,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			columnFilters,
			globalFilter,
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
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	});

	React.useEffect(() => {
		if (table.getState().columnFilters[0]?.id === "fullName") {
			if (table.getState().sorting[0]?.id !== "fullName") {
				table.setSorting([{ id: "fullName", desc: false }]);
			}
		}
	}, [table.getState().columnFilters[0]?.id]);

	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	);
	const { translate } = useBntTranslate();

	// We don't want to render all of the rows for this example, so cap
	// it for this use case
	// const firstPageRows = rows.slice(0, 10);
	// let pageSelectData = Array.apply(null, Array(pageOptions.length)).map(function () {});

	const numberOfRowsData = [5, 10, 20, 25, 50, 100];
	return (
		<TableContainer sx={{ boxShadow: "none" }}>
			{/* <Box display="flex" justifyContent="space-between" alignItems="center" p={3}> */}
			<Table>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCell
									component="th"
									scope="row"
									padding="none"
									key={header.id}
									colSpan={header.colSpan}
								>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			{/*	<div className="pagination-bottom"> */}
			{/*		<div className="-pagination"> */}
			{/*			<div className="-previous"> */}
			{/*				<button */}
			{/*					type="button" */}
			{/*					onClick={() => previousPage()} */}
			{/*					disabled={!canPreviousPage} */}
			{/*					className="-btn" */}
			{/*				> */}
			{/*					{t("Previous")} */}
			{/*				</button> */}
			{/*			</div> */}
			{/*			<div className="-center"> */}
			{/*				<GridContainer className={classes.gridContainer}> */}
			{/*					<GridItem xs={12} sm={6} md={4}> */}
			{/*						<FormControl */}
			{/*							fullWidth */}
			{/*							className={classes.selectFormControl + " " + classes.formControlMargins} */}
			{/*						> */}
			{/*							<Select */}
			{/*								MenuProps={{ */}
			{/*									className: classes.selectMenu, */}
			{/*								}} */}
			{/*								classes={{ */}
			{/*									select: classes.select, */}
			{/*								}} */}
			{/*								value={pageSelect} */}
			{/*								onChange={(event) => { */}
			{/*									gotoPage(event.target.value); */}
			{/*									handlePageSelect(event.target.value); */}
			{/*								}} */}
			{/*								inputProps={{ */}
			{/*									name: "pageSelect", */}
			{/*									id: "page-select", */}
			{/*								}} */}
			{/*							> */}
			{/*								{pageSelectData.map((prop, key) => { */}
			{/*									return ( */}
			{/*										<MenuItem */}
			{/*											key={key} */}
			{/*											classes={{ */}
			{/*												root: classes.selectMenuItem, */}
			{/*												selected: classes.selectMenuItemSelected, */}
			{/*											}} */}
			{/*											value={key} */}
			{/*										> */}
			{/*											{t("Page")} {key + 1} */}
			{/*										</MenuItem> */}
			{/*									); */}
			{/*								})} */}
			{/*							</Select> */}
			{/*						</FormControl> */}
			{/*					</GridItem> */}
			{/*					<GridItem xs={12} sm={6} md={4}> */}
			{/*						<FormControl */}
			{/*							fullWidth */}
			{/*							className={classes.selectFormControl + " " + classes.formControlMargins} */}
			{/*						> */}
			{/*							<Select */}
			{/*								MenuProps={{ */}
			{/*									className: classes.selectMenu, */}
			{/*								}} */}
			{/*								classes={{ */}
			{/*									select: classes.select, */}
			{/*								}} */}
			{/*								value={numberOfRows} */}
			{/*								onChange={(event) => { */}
			{/*									setPageSize(event.target.value); */}
			{/*									setNumberOfRows(event.target.value); */}
			{/*								}} */}
			{/*								inputProps={{ */}
			{/*									name: "numberOfRows", */}
			{/*									id: "number-of-rows", */}
			{/*								}} */}
			{/*							> */}
			{/*								{numberOfRowsData.map((prop) => { */}
			{/*									return ( */}
			{/*										<MenuItem */}
			{/*											key={prop} */}
			{/*											classes={{ */}
			{/*												root: classes.selectMenuItem, */}
			{/*												selected: classes.selectMenuItemSelected, */}
			{/*											}} */}
			{/*											value={prop} */}
			{/*										> */}
			{/*											{prop} {t("rows")} */}
			{/*										</MenuItem> */}
			{/*									); */}
			{/*								})} */}
			{/*							</Select> */}
			{/*						</FormControl> */}
			{/*					</GridItem> */}
			{/*				</GridContainer> */}
			{/*			</div> */}
			{/*			<div className="-next"> */}
			{/*				<button */}
			{/*					type="button" */}
			{/*					onClick={() => nextPage()} */}
			{/*					disabled={!canNextPage} */}
			{/*					className="-btn" */}
			{/*				> */}
			{/*					{t("Next")} */}
			{/*				</button> */}
			{/*			</div> */}
			{/*		</div> */}
			{/*	</div> */}
			{/* </div> */}
		</TableContainer>
	);
};
