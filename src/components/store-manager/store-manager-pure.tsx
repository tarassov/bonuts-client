/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-file @typescript-eslint/no-unused-vars
import { FC, useMemo, useState } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_r } from "services/localization/texts/texts_r";
import { ReactTable } from "shared/react-table/react-table";
import { TDonut } from "@/types/model";

export type StoreManagerPureProps = {
	donuts?: Array<TDonut>;
};

export const StoreManagerPure: FC<StoreManagerPureProps> = ({ donuts }) => {
	const { translate } = useBntTranslate();
	const columnHelper = createColumnHelper<TDonut>();
	const columns = [
		columnHelper.accessor("name", {
			cell: (info) => info.getValue(),
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor("price", {
			cell: (info) => info.getValue(),
			footer: (info) => info.column.id,
		}),
	];

	if (!donuts) return null;
	return (
		<div>
			<ReactTable columns={columns} data={donuts} />
		</div>
	);
};
