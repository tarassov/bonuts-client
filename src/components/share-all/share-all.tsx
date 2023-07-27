import { useEmployeeList } from "logic/hooks/employee/use-employee-list";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { EmployeeListCompact } from "components/employee/employee-list-compact/employee-list-compact";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_c, texts_n, texts_s } from "services/localization/texts";
import { BntStack } from "shared/stack/stack";
import { BntRegularButton } from "shared/buttons/regular-button";
import { BntRoundButton } from "shared/buttons/round-button";
import { texts_r } from "services/localization/texts/texts_r";
import { BntTypography } from "shared/typography/typography";
import { TProfile } from "@/types/model";

export const ShareAll = () => {
	const { objects = [] } = useEmployeeList();
	const [selected, setSelected] = useState<Array<TProfile>>([]);
	const { t } = useBntTranslate();

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
		setSelected(objects);
	};
	const removeAll = () => {
		setSelected([]);
	};

	const filtered = objects.filter((x) => selected.every((y) => y.id !== x.id));

	return (
		<>
			<Box className="ml-4">
				<BntTypography variant="h5">
					{t(texts_c.choose_employees, { capitalize: true })}
				</BntTypography>
			</Box>
			<Box className="m-4">
				<Grid container columnSpacing={2} rowSpacing={2}>
					<Grid item xs={12} sm={6}>
						<EmployeeListCompact
							title={t(texts_a.available_employees, { capitalize: true })}
							profiles={filtered}
							onClick={addProfile}
						>
							<>
								{filtered.length ? (
									<Box className="m-4">
										<BntRoundButton onClick={selectAll}>{t(texts_s.select_all)}</BntRoundButton>
									</Box>
								) : null}
							</>
						</EmployeeListCompact>
					</Grid>
					<Grid item xs={12} sm={6}>
						<EmployeeListCompact
							title={t(texts_s.selected_employees, { capitalize: true })}
							profiles={selected}
							onClick={removeProfile}
						>
							<>
								{selected.length ? (
									<Box className="m-4">
										<BntRoundButton color="secondary" onClick={removeAll}>
											{t(texts_r.remove_all)}
										</BntRoundButton>
									</Box>
								) : null}
							</>
						</EmployeeListCompact>
					</Grid>
				</Grid>
				<BntStack direction="row" alignItems="center" justifyContent="flex-end" className="mt-4">
					<BntRegularButton>{t(texts_n.next)}</BntRegularButton>
				</BntStack>
			</Box>
		</>
	);
};
