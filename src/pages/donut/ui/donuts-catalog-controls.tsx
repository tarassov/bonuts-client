import { SearchString } from "@/shared/ui/search-string";

import { DONUT_SORT_OPTIONS } from "../model/donuts-page-presenter";

import type { TDonut } from "@/types/model";

interface IDonutsCatalogControlsProps {
	onQueryChange: (query: string) => void;
	onSorterChange: (sorter: (firstDonut: TDonut, secondDonut: TDonut) => number) => void;
}

export function DonutsCatalogControls({ onQueryChange, onSorterChange }: IDonutsCatalogControlsProps) {
	return <SearchString<TDonut> buttons={DONUT_SORT_OPTIONS} name="donut-search" setSearch={onQueryChange} setSorter={onSorterChange} variant="surface" />;
}
