import React, { FC } from "react";
import { Sorting } from "constants/dictionary";

import { DonutSorter } from "logic/utils/sorter/donut-sorter";
import { SearchString } from "components/search-string/search-string";
import { TDonut } from "@/types/model";

export const BntDonutsSearch: FC<{
	setSearch: (search: string) => void;
	// eslint-disable-next-line react/no-unused-prop-types
	setFilter: (filters: Array<{ (a: TDonut): boolean }>) => void;
	setSorter: (sorter: (a: TDonut, b: TDonut) => number) => void;
}> = ({ setSorter, setSearch, setFilter }) => {
	const buttons: Array<{
		name: Sorting;
		sorter: (a: TDonut, b: TDonut) => number;
	}> = [
		{
			name: Sorting.PRICE_ASC,
			sorter: DonutSorter.sorterByPriceAsc,
		},
		{
			name: Sorting.PRICE_DESC,
			sorter: DonutSorter.sorterByPriceDesc,
		},
		{
			name: Sorting.SORT_BY_ALPHABET,
			sorter: DonutSorter.sorterByName,
		},
		{
			name: Sorting.NEWEST,
			sorter: DonutSorter.sorterByDate,
		},
	];

	return (
		<SearchString<TDonut>
			setSearch={setSearch}
			setFilter={setFilter}
			setSorter={setSorter}
			buttons={buttons}
		/>
	);
};
