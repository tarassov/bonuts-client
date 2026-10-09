import { Sorting } from "@/constants/dictionary";
import { EmployeeSorter } from "@/logic/utils/sorter/employee-sorter";
import type { TProfile } from "@/types/model";
import type { TSorter, TSorterButton } from "@/types/ui/sorter-button";

export const getEmployeeSearchButtons = (): Array<TSorterButton<TSorter<TProfile>>> => {
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
