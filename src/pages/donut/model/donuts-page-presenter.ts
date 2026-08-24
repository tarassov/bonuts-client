import { Sorting } from "@/constants/dictionary";
import type { TDonut } from "@/types/model";
import type { TSorterButton } from "@/types/ui/sorter-button";

const sortByName = (firstDonut: TDonut, secondDonut: TDonut) => firstDonut.name.localeCompare(secondDonut.name);
const sortByPriceAscending = (firstDonut: TDonut, secondDonut: TDonut) => firstDonut.price - secondDonut.price;
const sortByPriceDescending = (firstDonut: TDonut, secondDonut: TDonut) => secondDonut.price - firstDonut.price;
const sortByNewest = (firstDonut: TDonut, secondDonut: TDonut) => new Date(secondDonut.created_at || 0).getTime() - new Date(firstDonut.created_at || 0).getTime();

export const DONUT_SORT_OPTIONS: Array<TSorterButton<TDonut>> = [
	{ name: Sorting.PRICE_ASC, sorter: sortByPriceAscending },
	{ name: Sorting.PRICE_DESC, sorter: sortByPriceDescending },
	{ name: Sorting.SORT_BY_ALPHABET, sorter: sortByName },
	{ name: Sorting.NEWEST, sorter: sortByNewest },
];

export const DEFAULT_DONUT_SORTER = sortByName;

export const getVisibleDonuts = (donuts: Array<TDonut>, query: string, sorter: (firstDonut: TDonut, secondDonut: TDonut) => number) => {
	const normalizedQuery = query.trim().toLocaleLowerCase();

	return donuts.filter((donut) => donut.name.toLocaleLowerCase().includes(normalizedQuery)).toSorted(sorter);
};
