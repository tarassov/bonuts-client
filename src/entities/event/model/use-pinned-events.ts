import { useMemo } from "react";

import { authTenantSelector } from "@/shared/model/auth";

import { useGetEventsPinnedQuery } from "../api/events-api";
import { apiEventsToPosts } from "../lib/api-events-to-posts";

import { USE_POLLING_INTERVAL } from "@/app/config";
import { useAppSelector } from "@/services/redux/store/store";
import type { TPost } from "@/types/model/post";

export const usePinnedEvents = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, isLoading } = useGetEventsPinnedQuery(
		{ tenant: authTenant },
		{
			skip: !authTenant,
			pollingInterval: USE_POLLING_INTERVAL ? 60000 : 0,
			refetchOnMountOrArgChange: true,
		}
	);

	const pinnedPosts = useMemo<Array<TPost>>(() => (data ? apiEventsToPosts(data) : []), [data]);

	return { pinnedPosts, isLoading };
};
