import { type IStoreStatistics, StoreSort, StoreTab } from "./store-page.types";
import type { TDonut } from "@/types/model";

export const getStoreStatistics = (donuts: Array<TDonut>): IStoreStatistics => ({
	activeCount: donuts.filter((donut) => donut.active).length,
	soldOutCount: donuts.filter((donut) => donut.has_remains && !donut.on_stock).length,
	unlimitedCount: donuts.filter((donut) => !donut.has_remains).length,
});

export const getVisibleDonuts = (donuts: Array<TDonut>, query: string, sort: StoreSort, tab: StoreTab) => {
	const normalizedQuery = query.trim().toLocaleLowerCase();
	const filteredDonuts = donuts.filter((donut) => {
		const matchesTab = tab === StoreTab.All || (tab === StoreTab.Active ? donut.active : !donut.active);
		const matchesQuery = !normalizedQuery || donut.name.toLocaleLowerCase().includes(normalizedQuery);

		return matchesTab && matchesQuery;
	});

	return filteredDonuts.sort((firstDonut, secondDonut) => {
		if (sort === StoreSort.Name) return firstDonut.name.localeCompare(secondDonut.name);

		return sort === StoreSort.PriceAsc ? firstDonut.price - secondDonut.price : secondDonut.price - firstDonut.price;
	});
};
