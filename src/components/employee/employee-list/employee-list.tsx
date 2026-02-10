import { FC } from "react";
import { Grid } from "@mui/material";

import { EmployeeCard } from "components/employee/employee-card/employee-card";
import { getEmployeeSearchButtons } from "components/employee/get-employee-search-buttons";
import { SearchString } from "components/search-string/search-string";
import { Modules } from "constants/modules";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { emptyFunction } from "utils/empty-function";

import { useEmployeeList } from "@/entities/profile/model/use-employee-list";

import { useSearch } from "logic/hooks/use-search";
import { TProfile } from "@/types/model";
import { TSorterButton } from "@/types/ui/sorter-button";

export const EmployeeList: FC = () => {
	const { objects = [], isLoading } = useEmployeeList();
	const { filteredList, setSorter, setSearch } = useSearch<TProfile>(objects, {
		searchField: "name",
	});
	const buttons: Array<TSorterButton<TProfile>> = getEmployeeSearchButtons();

	useLoader(Modules.Employees, isLoading);

	return (
		<>
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
		</>
	);
};
