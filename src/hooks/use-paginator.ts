import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";

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
>(endpoint: Endpoint, args: GetArgsType<Endpoint>) {
	const [pages, setPages] = useState<Array<GetResultType<Endpoint>>>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [trigger, result] = endpoint.useLazyQuery();
	const { data, isLoading, isSuccess } = endpoint.useQuery(
		{
			...args,
			page: 1,
		},
		{
			pollingInterval: 5000,
		}
	);

	useEffect(() => {
		setCurrentPage(args.page);
	}, []);

	const fetchNext = () => {
		setCurrentPage(currentPage + 1);
	};

	useEffect(() => {
		if (currentPage > 1) {
			trigger({ ...args, page: currentPage });
		}
	}, [currentPage]);

	useEffect(() => {
		console.log(pages);
	}, [pages]);

	useEffect(() => {
		if (!result.isSuccess) return;
		setPages([...pages, result.data]);
	}, [result.data]);

	useEffect(() => {
		if (isSuccess) {
			console.log(data);
			const newPages =
				pages.length === 0
					? [data]
					: [data, ...pages.splice(1, pages.length - 1)];
			console.log(newPages);
			setPages(newPages);
		}
	}, [data, isSuccess]);

	return {
		endpoint,
		result,
		pages,
		isLoading: isLoading && currentPage === 1,
		fetchNext,
		currentPage,
	};
}
