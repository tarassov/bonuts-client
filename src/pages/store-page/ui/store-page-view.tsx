import { useMemo, useState } from "react";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_s } from "services/localization/texts";

import { InfiniteScrollTrigger } from "@/shared/ui/infinite-scroll-trigger";
import { BntTypography } from "@/shared/ui/typography";

import { useDonutUi } from "@/entities/donut";

import { StoreSort, StoreTab } from "../model/store-page.types";
import { getStoreStatistics, getVisibleDonuts } from "../model/store-page-presenter";

import { StoreCatalogControls } from "./store-catalog-controls";
import styles from "./store-page.module.scss";
import { StorePageHeader } from "./store-page-header";
import { StoreRewardCard } from "./store-reward-card";
import { StoreStatistics } from "./store-statistics";
import type { TDonut } from "@/types/model";

export interface IStorePageViewProps {
	donuts?: Array<TDonut>;
	hasNext?: boolean;
	isFetching?: boolean;
	onCreateClick?: VoidFunction;
	onLoadMore?: VoidFunction;
	onToggleUseRemains?: (donut: TDonut) => void;
}

export function StorePageView({ donuts, hasNext = false, isFetching = false, onCreateClick, onLoadMore, onToggleUseRemains }: IStorePageViewProps) {
	const { t } = useBntTranslate();
	const { editDonut } = useDonutUi();
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState(StoreSort.PriceAsc);
	const [tab, setTab] = useState(StoreTab.All);
	const statistics = useMemo(() => getStoreStatistics(donuts || []), [donuts]);
	const visibleDonuts = useMemo(() => getVisibleDonuts(donuts || [], query, sort, tab), [donuts, query, sort, tab]);

	if (!donuts) return null;

	return (
		<main className={styles.page}>
			<StorePageHeader onCreateClick={onCreateClick} />
			<StoreStatistics statistics={statistics} total={donuts.length} />
			<StoreCatalogControls onQueryChange={setQuery} onSortChange={setSort} onTabChange={setTab} query={query} sort={sort} statistics={statistics} tab={tab} total={donuts.length} />
			<div className={styles.results}>
				<BntTypography color="text.secondary" variant="caption">
					{t(texts_s.shown_items, { shown: visibleDonuts.length, total: donuts.length })}
				</BntTypography>
				<BntTypography color="text.secondary" variant="caption">
					{t(texts_c.click_reward_to_edit)}
				</BntTypography>
			</div>
			<div className={styles.rewardGrid}>
				{visibleDonuts.map((donut) => (
					<StoreRewardCard donut={donut} key={donut.id} onEdit={editDonut} onToggleUseRemains={onToggleUseRemains} />
				))}
			</div>
			{hasNext && onLoadMore ? <InfiniteScrollTrigger isFetching={isFetching} onLoadMore={onLoadMore} /> : null}
		</main>
	);
}
