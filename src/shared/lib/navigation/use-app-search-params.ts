import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import type { TSearchParamValue } from "./build-path-with-search-params";
import { getEnumSearchParam, getNumberSearchParam, getSearchParam } from "./get-search-param";

interface IGetParamArgs {
	fallback?: string;
	name: string;
}

interface IGetEnumParamArgs<T extends string> {
	fallback: T;
	name: string;
	values: readonly T[];
}

interface IGetNumberParamArgs {
	fallback: number;
	name: string;
}

interface ISetParamArgs {
	name: string;
	// Filter changes should not add a history entry, so replace is the default.
	replace?: boolean;
	value: TSearchParamValue;
}

interface ISetParamsArgs {
	params: Record<string, TSearchParamValue>;
	replace?: boolean;
}

/**
 * Single entry point for reading and writing the search string.
 * Pages get typed getters with fallbacks instead of parsing `URLSearchParams` on their own.
 *
 * @example
 * const { getEnumParam, setParam } = useAppSearchParams();
 * const period = getEnumParam({ name: "period", values: Object.values(OperationPeriod), fallback: OperationPeriod.allTime });
 * setParam({ name: "period", value: OperationPeriod.month });
 */
export function useAppSearchParams() {
	const [searchParams, setSearchParams] = useSearchParams();

	const getParam = useCallback(({ fallback = "", name }: IGetParamArgs) => getSearchParam(searchParams, name, fallback), [searchParams]);

	const getEnumParam = useCallback(<T extends string>({ fallback, name, values }: IGetEnumParamArgs<T>) => getEnumSearchParam(searchParams, name, values, fallback), [searchParams]);

	const getNumberParam = useCallback(({ fallback, name }: IGetNumberParamArgs) => getNumberSearchParam(searchParams, name, fallback), [searchParams]);

	// `null` and `undefined` remove the param, so a default value never leaks into the url.
	const setParams = useCallback(
		({ params, replace = true }: ISetParamsArgs) => {
			const nextParams = new URLSearchParams(searchParams);

			Object.entries(params).forEach(([name, value]) => {
				if (value === undefined || value === null) nextParams.delete(name);
				else nextParams.set(name, String(value));
			});

			setSearchParams(nextParams, { replace });
		},
		[searchParams, setSearchParams]
	);

	const setParam = useCallback(
		({ name, replace, value }: ISetParamArgs) => {
			setParams({ params: { [name]: value }, replace });
		},
		[setParams]
	);

	return { getEnumParam, getNumberParam, getParam, searchParams, setParam, setParams };
}
