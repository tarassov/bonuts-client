import { useMemo, useState } from "react";
import _ from "lodash";
import { TBaseModel } from "@/types/model";

export const useSearch = <T extends TBaseModel>(
	objects: Array<T>,
	args: {
		searchField: keyof T;
		initialSorter?: (a: T, b: T) => number;
	}
) => {
	const { searchField, initialSorter } = args;
	const [search, setSearch] = useState<string>("");
	const [filterFunction, setFilterFunction] = useState<Array<{ (a: T): boolean }>>([]);
	const [sorter, setSorter] = useState<((a: T, b: T) => number) | undefined>(initialSorter);

	const updateSorter = (sorterFunction: any) => {
		setSorter(() => sorterFunction);
	};

	const filteredList = useMemo(() => {
		return objects
			.filter(
				(x) =>
					x[searchField] &&
					(x[searchField] as string).toLowerCase().indexOf(search.toLowerCase()) >= 0
			)
			.sort(_.isFunction(sorter) ? sorter : undefined);
	}, [search, filterFunction, objects, sorter]);

	return { filteredList, setSorter: updateSorter, setFilterFunction, setSearch };
};
