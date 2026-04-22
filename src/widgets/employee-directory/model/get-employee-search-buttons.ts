import { Sorting } from "@/constants/dictionary";
import { EmployeeSorter } from "@/logic/utils/sorter/employee-sorter";
import type { TProfile } from "@/types/model";
import type { TSorterButton } from "@/types/ui/sorter-button";

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
