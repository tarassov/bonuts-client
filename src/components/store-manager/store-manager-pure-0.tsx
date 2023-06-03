/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-file @typescript-eslint/no-unused-vars
import { FC, useMemo, useState } from "react";
import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	TableContainer,
	Box,
} from "@mui/material";
import { getSorting, stableSort } from "components/store-manager/stable-sort";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_r } from "services/localization/texts/texts_r";
import { TDonut } from "@/types/model";

export type StoreManagerPureProps = {
	donuts?: Array<TDonut>;
};

export const StoreManagerPure0: FC<StoreManagerPureProps> = ({ donuts }) => {
	const { translate } = useBntTranslate();
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof TDonut>("name");
	const [selected, setSelected] = useState<readonly string[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const visibleRows = useMemo(() => {
		if (!donuts) return [];
		return stableSort(donuts, getSorting(order, orderBy)).slice(
			page * rowsPerPage,
			page * rowsPerPage + rowsPerPage
		);
	}, [order, orderBy, page, rowsPerPage]);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, (donuts?.length || 0) - page * rowsPerPage);

	const isSelected = (name: string) => selected.indexOf(name) !== -1;
	return (
		<Box sx={{ maxWidth: "900px" }}>
			<TableContainer>
				<Table aria-labelledby="tableTitle">
					<TableBody>
						{visibleRows.map((n, index) => {
							const isItemSelected = isSelected(n.name);
							const labelId = `enhanced-table-checkbox-${index}`;
							return (
								<TableRow
									hover
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={n.id}
									selected={isItemSelected}
									onClick={(event) => handleClick(event, n.name)}
									sx={{ cursor: "pointer" }}
								>
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={isItemSelected}
											inputProps={{
												"aria-labelledby": labelId,
											}}
										/>
									</TableCell>
									<TableCell component="th" scope="row" padding="none" width="45%">
										{n.name}
									</TableCell>
									<TableCell align="right" width="25%">
										{n.price}
									</TableCell>
									<TableCell align="left" width="30%">
										{n.expiration_date}
									</TableCell>
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 49 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={donuts?.length || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				labelRowsPerPage={translate(texts_r.rows_per_page)}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};
