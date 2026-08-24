import { useMemo, useState } from "react";

import { InfiniteScrollTrigger } from "@/shared/ui/infinite-scroll-trigger";
import { useLoader } from "@/shared/ui/loader";

import { DonutCard, useDonutsFeed, useDonutUi } from "@/entities/donut";

import { DEFAULT_DONUT_SORTER, getVisibleDonuts } from "../model/donuts-page-presenter";

import { DonutsCatalogControls } from "./donuts-catalog-controls";
import styles from "./donuts-page.module.scss";
import { Modules } from "@/constants/modules";
import type { TDonut } from "@/types/model";

export function DonutsPage() {
	const [query, setQuery] = useState("");
	const [sorter, setSorter] = useState<(firstDonut: TDonut, secondDonut: TDonut) => number>(() => DEFAULT_DONUT_SORTER);
	const { donuts, fetchNext, hasNext, isFetching, isLoading } = useDonutsFeed();
	const { showDonut } = useDonutUi();
	const visibleDonuts = useMemo(() => getVisibleDonuts(donuts, query, sorter), [donuts, query, sorter]);

	useLoader(Modules.Donuts, isLoading);

	return (
		<main className={styles.page}>
			<DonutsCatalogControls onQueryChange={setQuery} onSorterChange={setSorter} />
			<div className={styles.grid}>
				{visibleDonuts.map((donut) => (
					<DonutCard donut={donut} key={donut.id} onClick={() => showDonut(donut.id)} />
				))}
			</div>
			{hasNext ? <InfiniteScrollTrigger isFetching={isFetching} onLoadMore={fetchNext} /> : null}
		</main>
	);
}
