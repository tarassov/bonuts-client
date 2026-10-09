import type { ChangeEvent } from "react";
import { SearchRounded } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

import { BntTextInput } from "@/shared/ui/input";
import { BntTypography } from "@/shared/ui/typography";

import { EmployeeListSort } from "@/entities/profile";

import styles from "./employee-directory.module.scss";
import { EmployeeSortButton } from "./employee-list.styles";
import { Sorting } from "@/constants/dictionary";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_e, texts_n, texts_s } from "@/services/localization/texts";

interface IEmployeeDirectoryToolbarProps {
	query: string;
	sort: EmployeeListSort;
	onQueryChange: (query: string) => void;
	onSortChange: (sort: EmployeeListSort) => void;
}

export function EmployeeDirectoryToolbar({ query, sort, onQueryChange, onSortChange }: IEmployeeDirectoryToolbarProps) {
	const { t } = useBntTranslate();
	const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
		onQueryChange(event.target.value);
	};

	return (
		<div className={styles.controls}>
			<BntTextInput
				clearable
				name="employee-directory-search"
				placeholder={t(texts_e.enter_colleague_name)}
				size="small"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchRounded color="action" />
							</InputAdornment>
						),
					},
				}}
				sx={{ "& .MuiInputBase-root": { minHeight: 48, borderRadius: 3, backgroundColor: "background.paper" } }}
				value={query}
				onChange={handleQueryChange}
				onClear={() => onQueryChange("")}
			/>
			<div className={styles.sort}>
				<BntTypography className={styles.sortLabel} color="text.secondary" variant="caption">
					{t(texts_s.sort_by)}
				</BntTypography>
				<EmployeeSortButton isActive={sort === EmployeeListSort.Alphabet} onClick={() => onSortChange(EmployeeListSort.Alphabet)}>
					{t(Sorting.SORT_BY_ALPHABET)}
				</EmployeeSortButton>
				<EmployeeSortButton isActive={sort === EmployeeListSort.Newest} onClick={() => onSortChange(EmployeeListSort.Newest)}>
					{t(texts_n.newest_colleagues)}
				</EmployeeSortButton>
			</div>
		</div>
	);
}
