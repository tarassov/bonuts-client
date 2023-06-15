import { useMemo } from "react";
import { texts_n } from "services/localization/texts";
import { texts_p } from "services/localization/texts/texts_p";
import { createColumnHelper } from "@tanstack/react-table";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { StoreActionCell } from "components/store-manager/store-action-cell";
import { TDonut } from "@/types/model";

export const useStoreTableConfig = () => {
	const columnHelper = createColumnHelper<TDonut & { actions: any }>();
	const { translate } = useBntTranslate();
	const storeTableColumns = useMemo(
		() => [
			columnHelper.accessor("name", {
				cell: (info) => <div className="pl-3">{info.getValue()}</div>,
				header: translate(texts_n.name, { capitalize: true }),
				footer: (info) => info.column.id,
				enableSorting: true,
			}),
			columnHelper.accessor("price", {
				cell: (info) => info.getValue(),
				header: translate(texts_p.price, { capitalize: true }),
				footer: (info) => info.column.id,
				enableSorting: true,
			}),
			columnHelper.accessor("actions", {
				cell: (info) => <StoreActionCell donutId={info.row.original.id} />,
				header: "",
				enableSorting: false,
				enableColumnFilter: false,
			}),
		],
		[]
	);

	return { storeTableColumns };
};
