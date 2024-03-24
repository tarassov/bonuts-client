import React, { useState } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";

import classnames from "classnames";
import { matchSorter } from "match-sorter";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {
	FormControl,
	Grid,
	MenuItem,
	Select,
	Stack,
	TableCell,
	TableHead,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { fuzzyFilter } from "shared/react-table/filters";
import { ColumnFilter } from "shared/react-table/column-filter";
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import { texts_p } from "services/localization/texts/texts_p";
import { texts_n } from "services/localization/texts";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { emptyFunction } from "utils/empty-function";

function fuzzyTextFilterFn(rows: Array<any>, id: number, filterValue: string) {
	return matchSorter<any>(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

// Our table component
// eslint-disable-next-line comma-spacing
export const BntReactTablePure = <T,>({
	columns,
	data,
	className,
	pageSize = 5,
	isVirtual = false,
	estimateSize,
	hasNext = false,
	isFetching = false,
	fetchNext = emptyFunction,
	virtualOverscan = 100,
	noHeaders = false,
}: {
	columns: Array<ColumnDef<T, any>>;
	data: Array<T>;
	className?: string;
	pageSize?: number;
	isVirtual?: boolean;
	virtualOverscan?: number;
	estimateSize?: number;
	hasNext?: boolean;
	isFetching?: boolean;
	fetchNext?: VoidFunction;
	noHeaders?: boolean;
}) => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const tableContainerRef = React.useRef<HTMLDivElement>(null);
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

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
		getPaginationRowModel: !isVirtual ? getPaginationRowModel() : undefined,
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		onSortingChange: setSorting,
	});

	const { translate } = useBntTranslate();

	const numberOfRowsData = [5, 10, 20, 25, 50, 100];

	const { rows } = table.getRowModel();

	const virtualizer = useVirtualizer({
		getScrollElement: () => tableContainerRef?.current,
		count: rows.length,
		overscan: virtualOverscan,
		estimateSize: () => estimateSize || (matchesDownSm ? 200 : 100),
		rangeExtractor: (range) => {
			return defaultRangeExtractor({
				...range,
				startIndex:
					range.startIndex % 2 === 0 ? range.startIndex : Math.max(0, range.startIndex - 1),
			});
		},
	});

	const fetchMoreOnBottomReached = React.useCallback(
		(containerRefElement?: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				// once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
				if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching && hasNext) {
					fetchNext();
				}
			}
		},
		[fetchNext, isFetching, hasNext]
	);
	// a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
	React.useEffect(() => {
		fetchMoreOnBottomReached(tableContainerRef.current);
	}, [fetchMoreOnBottomReached]);

	const virtualRows = virtualizer.getVirtualItems();

	const [paddingTop, paddingBottom] =
		virtualRows.length > 0
			? [virtualRows[0].start, virtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end]
			: [0, 0];

	return (
		<TableContainer
			sx={{ boxShadow: "none", height: "100%", overflow: "auto" }}
			className={className}
			onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
			ref={tableContainerRef}
		>
			<Table
				stickyHeader
				// style={isVirtual ? { height: virtualizer.getTotalSize(), position: "relative" } : {}}
			>
				{!noHeaders ? (
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
												{flexRender(
													columnHeader.column.columnDef.header,
													columnHeader.getContext()
												)}
												{columnHeader.column.getCanSort() && (
													<Stack
														className={classnames(`sort-${columnHeader.column.getIsSorted()}`)}
													>
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
				) : null}
				<TableBody>
					{paddingTop > 0 && (
						<TableRow>
							<TableCell style={{ height: `${paddingTop}px` }} />
						</TableRow>
					)}
					{virtualRows.map((virtualRow: any, i) => {
						const row = rows[virtualRow.index] as Row<any>;
						return (
							<TableRow
								key={row.id}
								ref={isVirtual ? virtualizer.measureElement : undefined}
								data-index={i}
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
						);
					})}
					{paddingBottom > 0 && (
						<TableRow>
							<TableCell style={{ height: `${paddingBottom}px` }} />
						</TableRow>
					)}
				</TableBody>
			</Table>
			{data.length && !isVirtual ? (
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
