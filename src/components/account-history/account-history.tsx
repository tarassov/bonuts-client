import { FC } from "react";
import { useAccountHistoryTableConfig } from "components/account-history/use-account-history-table-config";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useOperationHistory } from "logic/hooks/operation/use-operation-history";
import { BntReactTable } from "shared/react-table/bnt-react-table";

export const AccountHistory: FC<{ accountId?: number }> = ({ accountId }) => {
	const { tableConfig } = useAccountHistoryTableConfig();
	const { hasNext, flatData, isLoading, fetchNext, isFetching } = useOperationHistory({
		id: accountId,
	});

	useLoader(Modules.Events, isLoading);

	return (
		<BntReactTable
			columns={tableConfig}
			data={flatData}
			isVirtual
			estimateSize={100}
			fetchNext={fetchNext}
			isFetching={isFetching}
			hasNext={hasNext}
		/>
	);
};
