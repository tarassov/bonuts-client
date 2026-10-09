import { FormControl, MenuItem, Select } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_b, texts_h, texts_l, texts_n, texts_r, texts_s } from "services/localization/texts";

import { SearchString } from "@/shared/ui/search-string";
import { BntSurface } from "@/shared/ui/surface";
import { BntSegmentedTabs } from "@/shared/ui/tab";

import { type IStoreStatistics, StoreSort, StoreTab } from "../model/store-page.types";

import styles from "./store-catalog-controls.module.scss";

interface IStoreCatalogControlsProps {
	onQueryChange: (value: string) => void;
	onSortChange: (value: StoreSort) => void;
	onTabChange: (value: StoreTab) => void;
	query: string;
	sort: StoreSort;
	statistics: IStoreStatistics;
	tab: StoreTab;
	total: number;
}

export function StoreCatalogControls(props: IStoreCatalogControlsProps) {
	const { onQueryChange, onSortChange, onTabChange, query, sort, statistics, tab, total } = props;
	const { t } = useBntTranslate();
	const tabs = [
		{ count: total, label: t(texts_a.all), value: StoreTab.All },
		{ count: statistics.activeCount, label: t(texts_a.active, { capitalize: true }), value: StoreTab.Active },
		{ count: total - statistics.activeCount, label: t(texts_n.not_active, { capitalize: true }), value: StoreTab.Inactive },
	];

	return (
		<BntSurface className={styles.catalogControls}>
			<BntSegmentedTabs ariaLabel={t(texts_r.rewards_filter)} items={tabs} onChange={onTabChange} value={tab} />
			<div className={styles.filters}>
				<SearchString name="store-reward-search" placeholder={t(texts_s.search_by_name)} setSearch={onQueryChange} value={query} variant="surface" />
				<FormControl className={styles.sortControl} size="small">
					<Select aria-label={t(texts_s.sort_rewards)} onChange={(event) => onSortChange(event.target.value as StoreSort)} value={sort}>
						<MenuItem value={StoreSort.PriceAsc}>{t(texts_l.lowest_price_first)}</MenuItem>
						<MenuItem value={StoreSort.PriceDesc}>{t(texts_h.highest_price_first)}</MenuItem>
						<MenuItem value={StoreSort.Name}>{t(texts_b.by_name, { capitalize: true })}</MenuItem>
					</Select>
				</FormControl>
			</div>
		</BntSurface>
	);
}
