import { FC } from "react";
import { Grid } from "@mui/material";

import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { emptyFunction } from "utils/empty-function";

import { Modules } from "constants/modules";

import { useSearch } from "logic/hooks/use-search";

import { EmployeeCard } from "components/employee/employee-card/employee-card";
import { getEmployeeSearchButtons } from "components/employee/get-employee-search-buttons";
import { SearchString } from "components/search-string/search-string";

import { useEmployeeList } from "@/entities/profile/model/use-employee-list";
import { TProfile } from "@/types/model";
import { TSorterButton } from "@/types/ui/sorter-button";

export const EmployeeList: FC = () => {
	const { objects = [], isLoading } = useEmployeeList();
	const { filteredList, setSorter, setSearch } = useSearch<TProfile>(objects, {
		searchField: "name",
	});
	const buttons: Array<TSorterButton<TProfile>> = getEmployeeSearchButtons();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const updateSorter = (sorterToUpdate: (a: TProfile, b: TProfile) => number) => {
		setSorter(() => sorterToUpdate);
	};

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
