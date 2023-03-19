import { FC, useEffect, useMemo, useState } from "react";
import { useBntTranslate } from "../../../hooks/use-bnt-translate";
import { useDonutList } from "../../../logic/hooks/use-donut-list";
import { BntDonutCard } from "../donut-card/donut-card";
import { Grid } from "@mui/material";
import { BntDonutCardStyled } from "../donut-card/donut-card-styled";
import { useLoader } from "../../../base/loader/hooks/use-loader";
import { Modules } from "../../../constants/modules";
import { TDonut } from "../../../types/model/donut";
import { BntDonutsSearch } from "./donuts-search";

export const BntDonutsList: FC = () => {
	const { translate } = useBntTranslate();
	const { setLoading } = useLoader();
	const [search, setSearch] = useState<string>("");
	const [filterFunction, setFilterFunction] = useState<
		Array<{ (a: TDonut): boolean }>
	>([]);
	const { objects = [], isLoading, isSuccess } = useDonutList();

	const updateFilter = (filters: Array<{ (a: TDonut): boolean }>) => {
		setFilterFunction(filters);
	};

	useEffect(() => {
		setLoading(Modules.Donuts, isLoading);
	}, [isLoading]);

	const filteredList = useMemo(() => {
		return objects.filter(
			(donut) =>
				donut.name &&
				donut.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
		);
	}, [search, filterFunction, objects]);
	return (
		<>
			<BntDonutsSearch setSearch={setSearch} setFilter={updateFilter} />
			<Grid container spacing={2}>
				{filteredList.map((donut) => {
					return (
						<Grid key={donut.id} item>
							<BntDonutCardStyled donut={donut} />
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};
