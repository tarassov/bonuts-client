import { TDonut } from "@/types/model";

export const DonutSorter = {
	sorterByName: (a: TDonut, b: TDonut) => {
		if (a?.name.toLowerCase() > b?.name.toLowerCase()) {
			return 1;
		}
		if (a?.name.toLowerCase() < b?.name.toLowerCase()) {
			return -1;
		}
		return 0;
	},
	sorterByPriceAsc: (a: TDonut, b: TDonut) => (a?.price || 0) - (b?.price || 0),
	sorterByPriceDesc: (a: TDonut, b: TDonut) => (b?.price || 0) - (a?.price || 0),
	sorterByDate: (a: TDonut, b: TDonut) =>
		new Date(b?.created_at || 0).getTime() - new Date(a?.created_at || 0).getTime(),
};
