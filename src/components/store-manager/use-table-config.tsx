import { useMemo } from "react";
import { texts_n } from "services/localization/texts";
import { texts_p } from "services/localization/texts/texts_p";
import { EditOutlined } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TDonut } from "@/types/model";

export const useTableConfig = () => {
	const columnHelper = createColumnHelper<TDonut & { actions: any }>();
	const { translate } = useBntTranslate();
	const storeTableColumns = useMemo(
		() => [
			columnHelper.accessor("name", {
				cell: (info) => info.getValue(),
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
				cell: () => <EditOutlined />,
				header: "",
				enableSorting: false,
				enableColumnFilter: false,
			}),
		],
		[]
	);

	return { storeTableColumns };
};
