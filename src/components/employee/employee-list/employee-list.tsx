import { FC, useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useEmployeeList } from "logic/hooks/employee/use-employee-list";
import { EmployeeSorter } from "logic/utils/sorter/employee-sorter";
import { EmployeeCard } from "components/employee/employee-card/employee-card";
import { TProfile } from "@/types/model";

export const EmployeeList: FC = () => {
	const { setLoading } = useLoader();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [search, setSearch] = useState<string>("");
	const [filterFunction, setFilterFunction] = useState<Array<{ (a: TProfile): boolean }>>([]);
	const [sorter, setSorter] = useState<{
		(a: TProfile, b: TProfile): number;
	}>(() => EmployeeSorter.sorterByName);
	const { objects = [], isLoading } = useEmployeeList();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const updateFilter = (filters: Array<{ (a: TProfile): boolean }>) => {
		setFilterFunction(filters);
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const updateSorter = (sorterToUpdate: (a: TProfile, b: TProfile) => number) => {
		setSorter(() => sorterToUpdate);
	};

	useEffect(() => {
		setLoading(Modules.Employees, isLoading);
	}, [isLoading]);

	const filteredList = useMemo(() => {
		return objects
			.filter(
				(profile) =>
					(profile.last_name &&
						profile.last_name.toLowerCase().indexOf(search.toLowerCase()) >= 0) ||
					(profile.first_name &&
						profile.first_name.toLowerCase().indexOf(search.toLowerCase()) >= 0) ||
					(profile.email && profile.email.toLowerCase().indexOf(search.toLowerCase()) >= 0)
			)
			.sort(sorter);
	}, [search, filterFunction, objects, sorter]);
	return (
		<>
			<Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
