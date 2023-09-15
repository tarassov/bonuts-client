import { FC, SyntheticEvent, useEffect } from "react";
import { useAccountHistoryTableConfig } from "components/account-history/use-account-history-table-config";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useOperationHistory } from "logic/hooks/operation/use-operation-history";
import { BntReactTable } from "shared/react-table/bnt-react-table";

export const AccountHistory: FC<{ accountId?: number }> = ({ accountId }) => {
	const { tableConfig } = useAccountHistoryTableConfig();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { hasNext, flatData, isLoading, fetchNext } = useOperationHistory({
		id: accountId,
	});

	const { setLoading } = useLoader();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onNext = (e: SyntheticEvent) => {
		e.preventDefault();
		fetchNext();
	};

	useEffect(() => {
		setLoading(Modules.Events, isLoading);
	}, [isLoading]);

	return <BntReactTable columns={tableConfig} data={flatData} isVirtual />;
};
