export type TSearchParamValue = boolean | number | string | null | undefined;

/**
 * Adds defined query parameters to an application route.
 * It keeps route construction in one place and avoids hand-built query strings.
 *
 * @example
 * buildPathWithSearchParams("/account_operations/42", { accountType: "distrib" });
 * // "/account_operations/42?accountType=distrib"
 */
export const buildPathWithSearchParams = (path: string, params: Record<string, TSearchParamValue>): string => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) searchParams.set(key, String(value));
	});

	const search = searchParams.toString();

	return search ? `${path}?${search}` : path;
};
