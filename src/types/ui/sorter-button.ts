import { Sorting } from "constants/dictionary";
import { TBaseModel } from "@/types/model";

export type TSorterButton<T extends TBaseModel> = {
	name: Sorting;
	sorter: (a: T, b: T) => number;
};
