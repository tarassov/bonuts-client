import type { Sorting } from "@/constants/dictionary";

export type TSorter<TValue> = (firstValue: TValue, secondValue: TValue) => number;

export type TSorterButton<TSort> = {
	name: Sorting;
	sorter: TSort;
};
