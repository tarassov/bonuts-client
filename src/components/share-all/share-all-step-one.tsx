import { FC, useState } from "react";
import { Grid } from "@mui/material";

import { BntBox } from "shared/ui/box/bnt-box";
import { BntRegularButton } from "shared/ui/buttons/regular-button";
import { BntRoundButton } from "shared/ui/buttons/round-button";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { emptyFunction } from "utils/empty-function";

import { Modules } from "constants/modules";

import { texts_a, texts_c, texts_n, texts_s } from "services/localization/texts";
import { texts_r } from "services/localization/texts/texts_r";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { useSearch } from "logic/hooks/use-search";

import { EmployeeListCompact } from "components/employee/employee-list-compact/employee-list-compact";

import { useEmployeeList } from "@/entities/profile";
import { TProfile } from "@/types/model";

export const ShareAllStepOne: FC<{
	next?: (args: { profiles: Array<TProfile> }) => void;
	initialProfiles?: Array<TProfile>;
}> = ({ next = emptyFunction, initialProfiles = [] }) => {
	const { objects = [], isLoading } = useEmployeeList();
	const [selected, setSelected] = useState<Array<TProfile>>(initialProfiles);
	const { t } = useBntTranslate();

	useLoader(Modules.ShareAll, isLoading);

	const filtered = objects.filter((x) => selected.every((y) => y.id !== x.id));

	const { filteredList, setSorter, setSearch } = useSearch<TProfile>(filtered, {
		searchField: "name",
	});

	const addProfile = (p: TProfile) => {
		setSelected((prev) => {
			const hasAlready = prev.some((x) => x.id === p.id);
			if (hasAlready) return prev;
			return [...prev, p];
		});
	};

	const removeProfile = (p: TProfile) => {
		setSelected((prev) => {
			return prev.filter((x) => x.id !== p.id);
		});
	};

	const selectAll = () => {
		setSelected([...filteredList, ...selected]);
	};
	const removeAll = () => {
		setSelected([]);
	};

	return (
		<>
			<BntBox className="ml-4">
				<BntTypography variant="h5">{t(texts_c.choose_employees, { capitalize: true })}</BntTypography>
			</BntBox>
			<BntBox className="m-4">
				<Grid container columnSpacing={2} rowSpacing={2}>
					<Grid item xs={12} sm={6}>
						<EmployeeListCompact
							title={t(texts_a.available_employees, { capitalize: true })}
							profiles={filteredList}
							onClick={addProfile}
							setSearch={setSearch}
							setSorter={setSorter}
							hideSearch={!filtered.length}
						>
							<>
								{filtered.length ? (
									<BntBox className="m-4">
										<BntRoundButton onClick={selectAll}>{t(texts_s.select_all)}</BntRoundButton>
									</BntBox>
								) : null}
							</>
						</EmployeeListCompact>
					</Grid>
					<Grid item xs={12} sm={6}>
						<EmployeeListCompact
							title={t(texts_s.selected_employees, { capitalize: true })}
							profiles={selected}
							onClick={removeProfile}
							hideSearch={!selected.length}
						>
							<>
								{selected.length ? (
									<BntBox className="m-4">
										<BntRoundButton color="secondary" onClick={removeAll}>
											{t(texts_r.remove_all)}
										</BntRoundButton>
									</BntBox>
								) : null}
							</>
						</EmployeeListCompact>
					</Grid>
				</Grid>
				<BntStack direction="row" alignItems="center" justifyContent="flex-end" className="mt-4">
					<BntRegularButton
						disabled={!selected.length}
						onClick={() => {
							if (selected.length) next({ profiles: selected });
						}}
					>
						{t(texts_n.next)}
					</BntRegularButton>
				</BntStack>
			</BntBox>
		</>
	);
};
