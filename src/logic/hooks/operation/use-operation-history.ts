import { useCallback, useMemo } from "react";

import { apiAdaptor } from "services/adaptor/api-adaptor";
import { useGetAccountOperationsFeedInfiniteQuery } from "services/api/extended/accounts-api";

import { USE_POLLING_INTERVAL } from "@/app/config";
import { useCurrentTenant } from "@/logic/hooks/tenant/use-current-tenant";

const pollingInterval = USE_POLLING_INTERVAL ? 10000 : 0;

export const useOperationHistory = (args: { id?: number }) => {
	const { id } = args;
	const tenant = useCurrentTenant();
	const queryArg = useMemo(() => ({ accountId: id ? String(id) : "", tenant: tenant || "" }), [id, tenant]);
	const { data, fetchNextPage, hasNextPage, isError, isFetching, isLoading } = useGetAccountOperationsFeedInfiniteQuery(queryArg, {
		pollingInterval,
		refetchOnMountOrArgChange: true,
		skip: !id,
	});
	const operations = useMemo(() => (data?.pages ?? []).flatMap((page) => apiAdaptor.toOperations(page)), [data?.pages]);

	const fetchNext = useCallback(() => {
		if (!hasNextPage || isFetching) return;

		fetchNextPage().catch(() => undefined);
	}, [fetchNextPage, hasNextPage, isFetching]);

	return {
		fetchNext,
		hasNext: Boolean(hasNextPage),
		isError,
		isFetching,
		isLoading,
		operations,
	};
};
