import { useState } from "react";

import { useDebounceCallback } from "usehooks-ts";

import { useLoader } from "@/shared/ui/loader";

import { EmployeeListSort, useEmployeeList } from "@/entities/profile";

import { EmployeeListView } from "./employee-list-view";
import { Modules } from "@/constants/modules";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_n, texts_p } from "@/services/localization/texts";

export function EmployeeList() {
	const { t } = useBntTranslate();
	const [query, setQuery] = useState("");
	const [searchText, setSearchText] = useState("");
	const [sort, setSort] = useState(EmployeeListSort.Alphabet);
	const {
		fetchNext,
		hasNext,
		isFetching,
		isLoading,
		loadedPageCount,
		objects: employees,
		onlineCount,
		teamCount,
	} = useEmployeeList({
		isAutoFetchAll: false,
		searchText: searchText || undefined,
		sort,
	});
	const debouncedSetSearchText = useDebounceCallback(setSearchText, 400);
	const handleQueryChange = (nextQuery: string) => {
		setQuery(nextQuery);
		debouncedSetSearchText(nextQuery.trim());
	};

	useLoader(Modules.Employees, isLoading);

	return (
		<EmployeeListView
			employees={employees}
			hasNext={hasNext}
			isFetching={isFetching}
			loadedPageCount={loadedPageCount}
			onlineCount={onlineCount}
			query={query}
			sort={sort}
			texts={{
				description: t(texts_c.colleagues_description),
				emptyDescription: t(texts_n.no_colleagues_description),
				emptyTitle: t(texts_n.no_colleagues_found),
				onlineCount: t(texts_n.now_online, { count: onlineCount }),
				teamCount: t(texts_p.people_in_team, { count: teamCount }),
				title: t(texts_c.colleagues),
			}}
			onLoadMore={fetchNext}
			onQueryChange={handleQueryChange}
			onSortChange={setSort}
		/>
	);
}
