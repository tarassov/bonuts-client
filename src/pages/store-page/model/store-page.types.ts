export enum StoreTab {
	All = "all",
	Active = "active",
	Inactive = "inactive",
}

export enum StoreSort {
	PriceAsc = "priceAsc",
	PriceDesc = "priceDesc",
	Name = "name",
}

export interface IStoreStatistics {
	activeCount: number;
	soldOutCount: number;
	unlimitedCount: number;
}
