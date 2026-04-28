import { getPaginator } from "./get-paginator";
import type { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import type { TPageable } from "@/types/api/api";

export const getNextPageParam = <TResponse>(lastPage: TPageable<TResponse>, _allPages: Array<TPageable<TResponse>>, lastPageParam: number): number | undefined => {
	const perPage = lastPage?.paginator?.perPage || 1;
	const total = lastPage?.paginator?.total || 0;
	const hasNextPage = lastPageParam < total / perPage;

	return hasNextPage ? lastPageParam + 1 : undefined;
};

export const getTransformPageableResponse = <TResponse>() => {
	return (response: unknown, meta: FetchBaseQueryMeta | undefined): TResponse => {
		const pageableResponse = response as TPageable<TResponse>;

		pageableResponse.paginator = getPaginator(meta);

		return pageableResponse as TResponse;
	};
};
