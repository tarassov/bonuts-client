import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";

import { useGetEventsByIdQuery } from "../api/events-api";
import { apiEventToPost } from "../lib/api-events-to-posts";

export const useEventLoader = (id?: number | string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading } = useGetEventsByIdQuery(
		{
			id: id?.toString() || "",
			tenant: authTenant || undefined,
		},
		{ skip: !id, refetchOnMountOrArgChange: true }
	);

	const post = data ? apiEventToPost(data) : undefined;
	return { post, isLoading, error };
};
