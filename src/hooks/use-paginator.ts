/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { USE_POLLING_INTERVAL } from "../config";
import { TPageable } from "../types/api";
import {
	RootState,
	store,
	useAppDispatch,
	useAppSelector,
} from "../services/store/store";
import { deepEqual } from "fast-equals";

type GetResultType<T> = T extends ApiEndpointQuery<
	QueryDefinition<any, any, string, infer ResultType, string>,
	any
>
	? ResultType
	: never;

type GetArgsType<T> = T extends ApiEndpointQuery<
	QueryDefinition<infer ArgsType, any, string, any, string>,
	any
>
	? ArgsType & { page: number }
	: never;

export function usePaginator<
	Endpoint extends ApiEndpointQuery<any, any> &
		QueryHooks<QueryDefinition<any, any, string, GetResultType<Endpoint>>>
>(
	endpoint: Endpoint,
	args: GetArgsType<Endpoint>,
	pollingInterval: number | undefined
) {
	const dispatch = useAppDispatch();
	const queries = useAppSelector((state: RootState) => state.api.queries);
	const [pages, setPages] = useState<Record<number, GetResultType<Endpoint>>>(
		[]
	);

	const [results, setResults] = useState<Array<any>>([]);
	const [temp, setTemp] = useState<GetResultType<Endpoint>>();
	const [currentPage, setCurrentPage] = useState(0);
	const [hasNew, setHasNew] = useState(false);
	const [hasNext, setHasNext] = useState(false);
	const { data, isLoading, isSuccess } = endpoint.useQuery(
		{
			...args,
			page: 1,
		},
		{
			pollingInterval: !USE_POLLING_INTERVAL
				? 0
				: pollingInterval !== undefined
				? pollingInterval
				: 5000,
			refetchOnMountOrArgChange: true,
		}
	);

	useEffect(() => {
		if (data) {
			const pageableData = data as TPageable<GetResultType<Endpoint>>;
			const perPage = pageableData?.paginator?.perPage
				? pageableData.paginator.perPage
				: 1;
			const total = pageableData?.paginator?.total || 0;
			setHasNext(currentPage < total / perPage);
		}
	}, [currentPage, data]);

	useEffect(() => {
		setCurrentPage(args.page);
	}, []);

	useEffect(() => {
		return () => {
			results.forEach((result) => result.unsubscribe());
		};
	}, []);

	const fetchNext = () => {
		setCurrentPage(currentPage + 1);
	};

	useEffect(() => {
		if (currentPage > 1) {
			const result = dispatch(
				endpoint.initiate({ ...args, page: currentPage })
			);
			setResults([...results, result]);
		}
	}, [currentPage]);

	useEffect(() => {
		if (currentPage > 1) {
			const rootState = store.getState();
			const newPages: Record<number, GetResultType<Endpoint>> = {};
			for (let i = 2; i <= currentPage; i++) {
				const { data } = endpoint.select({ ...args, page: i })(rootState);
				if (data) {
					const page = data as GetResultType<Endpoint>;
					if (!deepEqual(pages[i], page)) newPages[i] = page;
				}
			}
			if (Object.keys(newPages).length) setPages({ ...pages, ...newPages });
		}
	}, [queries]);

	useEffect(() => {
		if (isSuccess) {
			//if only one page is loaded then update immediately
			if (Object.keys(pages).length <= 1) {
				setPages({ 1: data });
			} else {
				//if other pages are loaded then save updates and mark hasNew as true
				setPages({ ...pages, 1: data });
				//setHasNew(true);
			}
		}
	}, [data, isSuccess]);

	useEffect(() => {
		if (!temp) setHasNew(false);
	}, [temp]);

	const applyUpdates = useCallback(() => {
		if (temp) {
			setCurrentPage(1);
			setPages([temp]);
			setTemp(undefined);
		}
	}, [pages, temp]);

	const paginatedPages = useMemo(() => {
		return pages as Array<TPageable<GetResultType<Endpoint>>>;
	}, [pages]);

	return {
		endpoint,
		pages,
		paginatedPages,
		isLoading: isLoading && currentPage === 1,
		fetchNext,
		currentPage,
		hasNew,
		applyUpdates,
		hasNext,
	};
}
