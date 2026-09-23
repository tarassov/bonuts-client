import { useMemo, useState } from "react";

import _ from "lodash";

import type { TBaseModel } from "@/types/model";
import type { TSorter } from "@/types/ui/sorter-button";

export const useSearch = <T extends TBaseModel>(
	objects: Array<T>,
	args: {
		searchField: keyof T;
		initialSorter?: TSorter<T>;
	}
) => {
	const { searchField, initialSorter } = args;
	const [search, setSearch] = useState<string>("");
	const [_filterFunction, setFilterFunction] = useState<Array<{ (a: T): boolean }>>([]);
	const [sorter, setSorter] = useState<TSorter<T> | undefined>(initialSorter);

	const updateSorter = (sorterFunction: TSorter<T>) => {
		setSorter(() => sorterFunction);
	};

	const filteredList = useMemo(() => {
		return objects.filter((x) => x[searchField] && (x[searchField] as string).toLowerCase().indexOf(search.toLowerCase()) >= 0).sort(_.isFunction(sorter) ? sorter : undefined);
	}, [objects, search, searchField, sorter]);

	return { filteredList, setSorter: updateSorter, setFilterFunction, setSearch };
};
