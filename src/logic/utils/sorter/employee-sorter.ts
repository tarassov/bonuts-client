import { CommonStrings } from "constants/dictionary";
import { TProfile } from "@/types/model";

const getNameForSort = (p: TProfile) => {
	if (!p) return CommonStrings.EMPTY_STRING;
	return (p.name || p.last_name || p.first_name || p.email || "").toLowerCase();
};
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
	sorterByDate: (a: TProfile, b: TProfile) => {
		const bDate: any = new Date(b.created_at || "1970/01/01");
		const aDate: any = new Date(a.created_at || "1970/01/01");
		return bDate - aDate;
	},
};
