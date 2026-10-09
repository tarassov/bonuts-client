import { DonutListSort } from "@/entities/donut";

import { Sorting } from "@/constants/dictionary";
import type { TSorterButton } from "@/types/ui/sorter-button";

export const DONUT_SORT_OPTIONS: Array<TSorterButton<DonutListSort>> = [
	{ name: Sorting.PRICE_ASC, sorter: DonutListSort.PriceAsc },
	{ name: Sorting.PRICE_DESC, sorter: DonutListSort.PriceDesc },
	{ name: Sorting.SORT_BY_ALPHABET, sorter: DonutListSort.Alphabet },
	{ name: Sorting.NEWEST, sorter: DonutListSort.Newest },
];

export const DEFAULT_DONUT_SORT = DonutListSort.Alphabet;
