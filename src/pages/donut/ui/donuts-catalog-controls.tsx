import { SearchString } from "@/shared/ui/search-string";

import type { DonutListSort } from "@/entities/donut";

import { DONUT_SORT_OPTIONS } from "../model/donuts-page-presenter";

import type { TDonut } from "@/types/model";

interface IDonutsCatalogControlsProps {
	onQueryChange: (query: string) => void;
	onSortChange: (sort: DonutListSort) => void;
}

export function DonutsCatalogControls({ onQueryChange, onSortChange }: IDonutsCatalogControlsProps) {
	return <SearchString<TDonut, DonutListSort> buttons={DONUT_SORT_OPTIONS} debounceDelay={350} name="donut-search" setSearch={onQueryChange} setSorter={onSortChange} variant="surface" />;
}
