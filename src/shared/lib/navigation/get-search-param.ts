/**
 * Base readers for values stored in the search string.
 * They keep the "read a param, validate it, fall back to a default" logic in one place,
 * so pages do not repeat their own parsing helpers.
 */

/**
 * Reads a raw string param.
 *
 * @example
 * getSearchParam(searchParams, "search", ""); // "coffee"
 */
export const getSearchParam = (searchParams: URLSearchParams, name: string, fallback = ""): string => {
	const value = searchParams.get(name);

	return value ?? fallback;
};

/**
 * Reads a param and keeps it only when it belongs to the allowed set of values.
 * Anything unexpected in the url falls back to the default value.
 *
 * @example
 * getEnumSearchParam(searchParams, "accountType", Object.values(AccountTypeFilter), AccountTypeFilter.all);
 */
export const getEnumSearchParam = <T extends string>(searchParams: URLSearchParams, name: string, values: readonly T[], fallback: T): T => {
	const value = searchParams.get(name);

	if (value === null) return fallback;
	if (!values.includes(value as T)) return fallback;

	return value as T;
};

/**
 * Reads a numeric param. Values that are not finite numbers fall back to the default value.
 *
 * @example
 * getNumberSearchParam(searchParams, "page", 1); // 3
 */
export const getNumberSearchParam = (searchParams: URLSearchParams, name: string, fallback: number): number => {
	const value = searchParams.get(name);

	if (value === null || value.trim() === "") return fallback;

	const parsedValue = Number(value);

	return Number.isFinite(parsedValue) ? parsedValue : fallback;
};
