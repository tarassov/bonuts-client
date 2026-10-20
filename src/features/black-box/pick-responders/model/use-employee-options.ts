import { useMemo, useState } from "react";

import { useDebounceValue } from "usehooks-ts";

import type { TBlackBoxProfile } from "@/entities/black-box";
import { useEmployeeList } from "@/entities/profile";

import { toResponderOption } from "./responder-option";

const SEARCH_DEBOUNCE_MS = 300;

/** Employees matching the typed name, searched on the server like the employee directory does. */
export const useEmployeeOptions = () => {
	const [searchText, setSearchText] = useState("");
	const [debouncedSearch] = useDebounceValue(searchText, SEARCH_DEBOUNCE_MS);
	const { objects, isFetching } = useEmployeeList({ searchText: debouncedSearch, isAutoFetchAll: false });
	const options = useMemo<Array<TBlackBoxProfile>>(() => objects.filter((profile) => profile.active !== false).map(toResponderOption), [objects]);

	return { options, searchText, setSearchText, isSearching: isFetching };
};
