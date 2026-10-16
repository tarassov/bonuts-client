import camelcaseKeys from "camelcase-keys";

export const parseSearchString = <PARAMS extends Record<string, string | undefined>>(search: string) => {
	const searchParams = new URLSearchParams(search);
	const paramsObject: Record<string, string> = {};

	for (const [key, value] of searchParams) {
		paramsObject[key] = value;
	}

	return camelcaseKeys(paramsObject) as PARAMS;
};
