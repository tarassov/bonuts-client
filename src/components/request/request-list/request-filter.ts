import { FilterFn } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { TRequest } from "@/types/model/request";

export const requestFilter: FilterFn<TRequest> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(
		`${row.original.donut?.name} ${row.original.profile?.name} ${row.original.created_at}`,
		value
	);
	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};
