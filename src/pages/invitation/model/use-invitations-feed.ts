import { useCallback, useMemo } from "react";

import { mapInvitationPreview } from "./invitation-list";
import { useCurrentTenant } from "@/logic/hooks/tenant/use-current-tenant";
import { useGetInvitationsFeedInfiniteQuery } from "@/services/api/extended/invitations-api";

const invitationsPerPage = 12;

export const useInvitationsFeed = () => {
	const tenant = useCurrentTenant();

	const queryArg = useMemo(
		() => ({
			tenant: tenant || "",
			perPage: invitationsPerPage,
		}),
		[tenant]
	);

	const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useGetInvitationsFeedInfiniteQuery(queryArg, {
		skip: !tenant,
		refetchOnMountOrArgChange: true,
	});

	const pages = useMemo(() => {
		return data?.pages.map((page) => mapInvitationPreview(page)) ?? [];
	}, [data?.pages]);

	const invitations = useMemo(() => pages.flat(), [pages]);

	const fetchNext = useCallback(() => {
		if (!hasNextPage || isFetching) return;
		fetchNextPage().catch(() => undefined);
	}, [fetchNextPage, hasNextPage, isFetching]);

	return {
		fetchNext,
		hasNext: Boolean(hasNextPage),
		invitations,
		isFetching,
		isLoading,
	};
};
