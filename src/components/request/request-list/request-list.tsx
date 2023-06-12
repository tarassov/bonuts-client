import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useRequestListLogic } from "logic/hooks/request/use-request-list-logic";
import { BntReactTable } from "shared/react-table/bnt-react-table";
import { useRequestTableConfig } from "components/request/request-list/use-request-table-config";

export const BntRequestsList: FC = () => {
	const { objects: requests, isLoading } = useRequestListLogic();
	const { tableConfig } = useRequestTableConfig();

	const { setLoading } = useLoader();

	useEffect(() => {
		setLoading(Modules.Requests, isLoading);
	}, [isLoading]);

	return (
		<Box ml={2} mt={2}>
			<BntReactTable columns={tableConfig} data={requests} />
		</Box>
	);
};
