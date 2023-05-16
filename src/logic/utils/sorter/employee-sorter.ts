import { TProfile } from "@/types/model";

const getNameForSort = (p: TProfile) => (p.last_name || p.first_name || p.email).toLowerCase();
export const EmployeeSorter = {
	sorterByName: (a: TProfile, b: TProfile) => {
		if (getNameForSort(a) > getNameForSort(b)) {
			return 1;
		}
		if (getNameForSort(a) < getNameForSort(b)) {
			return -1;
		}
		return 0;
	},
};
