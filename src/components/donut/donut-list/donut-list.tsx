import { FC, useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { DonutsSorter } from "logic/utils/donut-utils";
import { useDonutList } from "logic/hooks/use-donut-list";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { DonutCard } from "components/donut/donut-card/donut-card";
import { TDonut } from "@/types/model";
import { BntDonutsSearch } from "./donuts-search";

// TODO: extract pure component
export const BntDonutsList: FC = () => {
	const { setLoading } = useLoader();
	const [search, setSearch] = useState<string>("");
	const [filterFunction, setFilterFunction] = useState<Array<{ (a: TDonut): boolean }>>([]);
	const [sorter, setSorter] = useState<{
		(a: TDonut, b: TDonut): number;
	}>(() => DonutsSorter.sorterByName);
	const { objects = [], isLoading } = useDonutList();

	const updateFilter = (filters: Array<{ (a: TDonut): boolean }>) => {
		setFilterFunction(filters);
	};
	const updateSorter = (sorterToUpdate: (a: TDonut, b: TDonut) => number) => {
		setSorter(() => sorterToUpdate);
	};

	useEffect(() => {
		setLoading(Modules.Donuts, isLoading);
	}, [isLoading]);

	const filteredList = useMemo(() => {
		return objects
			.filter((donut) => donut.name && donut.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)
			.sort(sorter);
	}, [search, filterFunction, objects, sorter]);
	return (
		<>
			<BntDonutsSearch setSearch={setSearch} setFilter={updateFilter} setSorter={updateSorter} />
			<Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{filteredList.map((donut) => {
					return (
						<Grid key={donut.id} item xs={12} sm={12} md={6} lg={3}>
							<DonutCard donut={donut} />
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};
