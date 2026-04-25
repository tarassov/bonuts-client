import type { FC } from "react";
import { Grid } from "@mui/material";

import { useLoader } from "@/shared/ui/loader";
import { SearchString } from "@/shared/ui/search-string";

import { useEmployeeList } from "@/entities/profile";

import { getEmployeeSearchButtons } from "../model/get-employee-search-buttons";

import { EmployeeCard } from "./employee-card";
import { Modules } from "@/constants/modules";
import { useSearch } from "@/logic/hooks/use-search";
import type { TProfile } from "@/types/model";
import type { TSorterButton } from "@/types/ui/sorter-button";
import { emptyFunction } from "@/utils/empty-function";

export const EmployeeList: FC = () => {
	const { objects = [], isLoading } = useEmployeeList();
	const { filteredList, setSorter, setSearch } = useSearch<TProfile>(objects, {
		searchField: "name",
	});
	const buttons: Array<TSorterButton<TProfile>> = getEmployeeSearchButtons();

	useLoader(Modules.Employees, isLoading);

	return (
		<Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
			<Grid item xs={12}>
				<SearchString setSearch={setSearch} setFilter={emptyFunction} setSorter={setSorter} buttons={buttons} />
			</Grid>
			{filteredList.map((profile) => {
				return (
					<Grid key={profile.id} item xs={12} sm={12} md={6} lg={3}>
						<EmployeeCard employee={profile} />
					</Grid>
				);
			})}
		</Grid>
	);
};
