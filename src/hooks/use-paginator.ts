import { useCallback, useEffect, useMemo, useState } from "react";
import { deepEqual } from "fast-equals";
import { RootState, store, useAppDispatch, useAppSelector } from "services/redux/store/store";
import _ from "lodash";
import { USE_POLLING_INTERVAL } from "@/config";

import { GetArgsType, GetResultType, TEndpoint, TPageable } from "@/types/api/api";

export function usePaginator<Endpoint extends TEndpoint<Endpoint>>(
	endpoint: Endpoint,
	args: GetArgsType<Endpoint>,
	pollingInterval: number | undefined,
	skip?: boolean
) {
	const dispatch = useAppDispatch();
	const queries = useAppSelector((state: RootState) => state.api.queries);
	const { page, ...restArgs } = args;
	const [queryArgs, setQueryArgs] = useState(restArgs);
	const [pages, setPages] = useState<Record<number, GetResultType<Endpoint>>>([]);
	const [results, setResults] = useState<Array<any>>([]);
	const [temp, setTemp] = useState<GetResultType<Endpoint>>();
	const [currentPage, setCurrentPage] = useState(0);
	const [hasNew, setHasNew] = useState(false);
	const [hasNext, setHasNext] = useState(false);
	//
	// useEffect(() => {
	// 	console.log(restArgs);
	// 	console.log(queryArgs);
	// 	if (!_.isEqual(restArgs, queryArgs)) setQueryArgs(restArgs);
	// 	if (!_.isEqual(restArgs, queryArgs) && currentPage > 1) {
	// 		setQueryArgs(restArgs);
	// 		setCurrentPage(1);
	// 		setPages([]);
	// 		// setResults([]);
	// 		// setTemp(undefined);
	// 		// setHasNext(false);
	// 	}
	// }, [restArgs, queryArgs, currentPage]);

	const { data, isLoading, isSuccess } = endpoint.useQuery(
		{
			...args,
			page: 1,
		},
		{
			// eslint-disable-next-line no-nested-ternary
			pollingInterval: !USE_POLLING_INTERVAL
				? 0
				: pollingInterval !== undefined
				? pollingInterval
				: 5000,
			refetchOnMountOrArgChange: true,
			skip,
		}
	);

	useEffect(() => {
		if (data) {
			const pageableData = data as TPageable<GetResultType<Endpoint>>;
			const perPage = pageableData?.paginator?.perPage ? pageableData.paginator.perPage : 1;
			const total = pageableData?.paginator?.total || 0;
			setHasNext(currentPage < total / perPage);
		}
	}, [currentPage, data]);

	useEffect(() => {
		setCurrentPage(args.page || 0);
	}, []);

	useEffect(() => {
		return () => {
			results.forEach((result) => result.unsubscribe());
		};
	}, [results]);

	const fetchNext = useCallback(() => {
		setCurrentPage(currentPage + 1);
	}, [setCurrentPage, currentPage]);

	useEffect(() => {
		if (currentPage > 1) {
			const result = dispatch(endpoint.initiate({ ...args, page: currentPage }));
			setResults([...results, result]);
		}
	}, [currentPage]);

	useEffect(() => {
		if (currentPage > 1) {
			const rootState = store.getState();
			const newPages: Record<number, GetResultType<Endpoint>> = {};
			for (let i = 2; i <= currentPage; i++) {
				const { data: pageData } = endpoint.select({ ...args, page: i })(rootState);
				if (!pageData) break;
				if (data) {
					const queryPage = pageData as GetResultType<Endpoint>;
					if (!deepEqual(pages[i], queryPage)) newPages[i] = queryPage;
				}
			}
			if (Object.keys(newPages).length) setPages({ ...pages, ...newPages });
		}
	}, [queries, results, args]);

	useEffect(() => {
		if (isSuccess) {
			// if only one page is loaded then update immediately
			if (Object.keys(pages).length <= 1 || !_.isEqual(restArgs, queryArgs)) {
				setQueryArgs(restArgs);
				setCurrentPage(1);
				setPages({ 1: data });
			} else {
				// if other pages are loaded then save updates and mark hasNew as true
				setPages({ ...pages, 1: data });
				// setHasNew(true);
			}
		}
	}, [data, isSuccess]);

	useEffect(() => {
		if (!temp) setHasNew(false);
	}, [temp]);

	/*
	 * Apply new data from server. Resets pages to the first only
	 * */
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
		isFetching: isLoading,
		fetchNext,
		currentPage,
		hasNew,
		applyUpdates,
		hasNext,
	};
}
