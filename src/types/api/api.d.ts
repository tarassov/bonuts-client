import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryDefinition } from "@reduxjs/toolkit/query";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export type GetResultType<T> = T extends ApiEndpointQuery<
	QueryDefinition<any, any, string, infer ResultType, string>,
	any
>
	? ResultType
	: never;

export type GetArgsType<T> = T extends ApiEndpointQuery<
	QueryDefinition<infer ArgsType, any, string, any, string>,
	any
>
	? ArgsType & { page?: number }
	: never;
export type TEndpoint<Endpoint> = ApiEndpointQuery<any, any> &
	QueryHooks<QueryDefinition<any, any, string, GetResultType<Endpoint>>>;

export type TPaginator = {
	perPage: number;
	total: number;
};

export type TPageable<T> = T & { paginator: TPaginator };
