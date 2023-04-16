import React, { ChangeEvent, FC, useState } from "react";
import { Dictionary, Sorting } from "constants/dictionary";
import { TFieldType } from "shared/form/types/bnt-form";
import { BntTextField } from "shared/input/text-field";
import { BntStack } from "shared/stack/stack";
import { BntRoundButton } from "shared/buttons/round-button";
import { DonutsSorter } from "logic/utils/donut-utils";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TDonut } from "@/types/model";

export const BntDonutsSearch: FC<{
	setSearch: (search: string) => void;
	// eslint-disable-next-line react/no-unused-prop-types
	setFilter: (filters: Array<{ (a: TDonut): boolean }>) => void;
	setSorter: (sorter: (a: TDonut, b: TDonut) => number) => void;
}> = ({ setSorter, setSearch }) => {
	const { translate } = useBntTranslate();
	const [text, setText] = useState<string>("");
	const setValue = (value: string) => {
		setSearch(value);
		setText(value);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value || "");
	};
	const handleClear = () => {
		setValue("");
	};

	const buttons: Array<{
		name: Sorting;
		sorter: (a: TDonut, b: TDonut) => number;
	}> = [
		{
			name: Sorting.PRICE_ASC,
			sorter: DonutsSorter.sorterByPriceAsc,
		},
		{
			name: Sorting.PRICE_DESC,
			sorter: DonutsSorter.sorterByPriceDesc,
		},
		{
			name: Sorting.SORT_BY_ALPHABET,
			sorter: DonutsSorter.sorterByName,
		},
		{
			name: Sorting.NEWEST,
			sorter: DonutsSorter.sorterByDate,
		},
	];

	return (
		<>
			<BntTextField
				color="info"
				name="filter-donuts"
				placeholder={Dictionary.SEARCH_STRING}
				type={TFieldType.text}
				value={text}
				clearable
				onClear={handleClear}
				onChange={handleChange}
				className="mb-10"
				size="small"
				sx={{ width: "100%" }}
			/>
			<BntStack
				direction={{ xs: "column", sm: "row" }}
				className="mb-20"
				spacing={{ xs: 1, sm: 2 }}
			>
				{buttons.map((button) => {
					return (
						<BntRoundButton
							variant="outlined"
							key={button.name}
							onClick={(e: React.SyntheticEvent) => {
								e.preventDefault();
								setSorter(button.sorter);
							}}
							color="info"
						>
							{translate(button.name)}
						</BntRoundButton>
					);
				})}
			</BntStack>
		</>
	);
};
