import { useCallback, useMemo, useState } from "react";

import { InfiniteScrollTrigger } from "@/shared/ui/infinite-scroll-trigger";
import { useLoader } from "@/shared/ui/loader";

import { DonutCard, useDonutsFeed, useDonutUi } from "@/entities/donut";

import { DonutPurchaseButton, DonutPurchaseConfirmation, useDonutPurchase } from "@/features/donut-purchase";

import { DEFAULT_DONUT_SORTER, getVisibleDonuts } from "../model/donuts-page-presenter";

import { DonutsCatalogControls } from "./donuts-catalog-controls";
import styles from "./donuts-page.module.scss";
import { Modules } from "@/constants/modules";
import type { TDonut } from "@/types/model";

export function DonutsPage() {
	const [query, setQuery] = useState("");
	const [confirmedDonutId, setConfirmedDonutId] = useState<number>();
	const [sorter, setSorter] = useState<(firstDonut: TDonut, secondDonut: TDonut) => number>(() => DEFAULT_DONUT_SORTER);
	const { donuts, fetchNext, hasNext, isFetching, isLoading, loadedPageCount } = useDonutsFeed();
	const { showDonut } = useDonutUi();
	const { canPurchase, isPurchasing, purchaseDonut } = useDonutPurchase();
	const visibleDonuts = useMemo(() => getVisibleDonuts(donuts, query, sorter), [donuts, query, sorter]);

	const handlePurchase = useCallback(
		async (donut: TDonut) => {
			const isPurchased = await purchaseDonut(donut);
			if (isPurchased) setConfirmedDonutId(donut.id);
		},
		[purchaseDonut]
	);

	const handlePurchaseConfirmationComplete = useCallback(() => {
		setConfirmedDonutId(undefined);
	}, []);

	useLoader(Modules.Donuts, isLoading);

	return (
		<main className={styles.page}>
			<DonutsCatalogControls onQueryChange={setQuery} onSorterChange={setSorter} />
			<div className={styles.grid}>
				{visibleDonuts.map((donut) => (
					<DonutCard
						donut={donut}
						footer={canPurchase(donut) ? <DonutPurchaseButton donut={donut} isPurchasing={isPurchasing} isSubtle onPurchase={handlePurchase} /> : undefined}
						key={donut.id}
						onClick={() => showDonut(donut.id)}
						overlay={confirmedDonutId === donut.id ? <DonutPurchaseConfirmation onComplete={handlePurchaseConfirmationComplete} /> : undefined}
					/>
				))}
			</div>
			{hasNext ? <InfiniteScrollTrigger isFetching={isFetching} loadedPageCount={loadedPageCount} onLoadMore={fetchNext} /> : null}
		</main>
	);
}
