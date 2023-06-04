/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-file @typescript-eslint/no-unused-vars
import { FC } from "react";
import { BntReactTable } from "shared/react-table/bnt-react-table";
import { useTableConfig } from "components/store-manager/use-table-config";
import { TDonut } from "@/types/model";

export type StoreManagerPureProps = {
	donuts?: Array<TDonut>;
};

export const StoreManagerPure: FC<StoreManagerPureProps> = ({ donuts }) => {
	const { storeTableColumns } = useTableConfig();

	if (!donuts) return null;
	return (
		<div>
			<BntReactTable columns={storeTableColumns} data={donuts} />
		</div>
	);
};
