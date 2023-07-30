import { Sorting } from "constants/dictionary";
import { EmployeeSorter } from "logic/utils/sorter/employee-sorter";
import { TSorterButton } from "@/types/ui/sorter-button";
import { TProfile } from "@/types/model";

export const getEmployeeSearchButtons = (): Array<TSorterButton<TProfile>> => {
	return [
		{
			name: Sorting.SORT_BY_ALPHABET,
			sorter: EmployeeSorter.sorterByName,
		},
		{
			name: Sorting.NEWEST,
			sorter: EmployeeSorter.sorterByDate,
		},
	];
};
