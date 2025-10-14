import { FC } from "react";
import { ArchiveOutlined, ForwardToInboxOutlined, InboxOutlined } from "@mui/icons-material";
import { routesPath } from "routes/config/routes-path";
import { TBntBreadcrumbItem } from "shared/ui/types/breadcrumbs-types";

import { BntBreadcrumbs } from "shared/ui/breadcrumb/breadcrumbs";
import { CardWrapper } from "shared/ui/card-wrapper/card-wrapper";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntReactTable } from "shared/ui/react-table/bnt-react-table";
import { BntStack } from "shared/ui/stack";

import { emptyFunction } from "utils/empty-function";

import { Modules } from "constants/modules";

import { texts_a, texts_c, texts_i } from "services/localization/texts";
import { texts_r } from "services/localization/texts/texts_r";

import { useRequestListLogic } from "logic/hooks/request/use-request-list-logic";

import { useRequestTableConfig } from "components/request/request-list/use-request-table-config";

import { TRequest } from "@/types/model";

export type BntRequestListProps = {
	archive?: boolean;
	active?: boolean;
	my?: boolean;
	incoming?: boolean;
	onRollback?: (id: number, options: { onSuccess: (res: any) => void }) => void;
	onCheck?: (id: number, options: { onSuccess: (res: any) => void }) => void;
	hideActions?: boolean;
	checkRollbackEnabled?: (request: TRequest) => boolean;
	checkCheckEnabled?: (request: TRequest) => boolean;
	hideBreadCrumbs?: boolean;
	checkTooltip?: string;
	rollbackTooltip?: string;
};
export const RequestsList: FC<BntRequestListProps> = ({
	active,
	archive,
	incoming,
	my,
	onRollback = emptyFunction,
	onCheck = emptyFunction,
	hideActions = false,
	checkRollbackEnabled,
	checkCheckEnabled,
	hideBreadCrumbs,
	rollbackTooltip,
	checkTooltip,
}) => {
	const { objects: requests, isLoading, refetch } = useRequestListLogic({ active, archive, incoming, my });

	const rollback = (id: number) => {
		onRollback(id, { onSuccess: refetch });
	};
	const check = (id: number) => {
		onCheck(id, { onSuccess: refetch });
	};
	const { tableConfig } = useRequestTableConfig({
		onCheck: check,
		onRollback: rollback,
		hideActions,
		checkRollbackEnabled,
		checkCheckEnabled,
		rollbackTooltip,
		checkTooltip,
	});

	useLoader(Modules.Requests, isLoading);

	// eslint-disable-next-line no-nested-ternary
	const label = archive ? texts_c.closed_requests : active ? texts_a.activated : texts_i.incoming;

	// eslint-disable-next-line no-nested-ternary
	const icon = archive ? <ArchiveOutlined /> : active ? <InboxOutlined /> : <ForwardToInboxOutlined />;
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: texts_r.requests,
			link: routesPath.Requests,
			label: texts_r.requests,
			icon: <ForwardToInboxOutlined />,
		},
		{
			key: label,
			label,
			icon,
		},
	];
	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			{!hideBreadCrumbs && <BntBreadcrumbs items={breadcrumbs} />}
			<CardWrapper className="flex-grow scroll">
				<BntReactTable columns={tableConfig} data={requests} isVirtual estimateSize={100} />
			</CardWrapper>
		</BntStack>
	);
};
