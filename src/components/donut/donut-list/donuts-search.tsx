import React, { ChangeEvent, FC, useState } from "react";
import { TDonut } from "../../../types/model/donut";
import { BntFormTextField } from "../../../base/form/fields/bnt-form-text-field";
import { Dictionary, Sorting } from "../../../constants/dictionary";
import { TFieldType } from "../../../base/form/types/bnt-form";
import { BntTextField } from "../../../base/input/text-field";
import { BntStack } from "../../../base/stack/stack";
import { BntRoundButton } from "../../../base/buttons/round-button";
import { DonutsSorter } from "../../../logic/utils/donut-utils";
import { useBntTranslate } from "../../../hooks/use-bnt-translate";

export const BntDonutsSearch: FC<{
	setSearch: (search: string) => void;
	setFilter: (filters: Array<{ (a: TDonut): boolean }>) => void;
	setSorter: (sorter: (a: TDonut, b: TDonut) => number) => void;
}> = ({ setSorter, setSearch }) => {
	const { translate } = useBntTranslate();
	const [text, setText] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value || "");
	};
	const handleClear = () => {
		setValue("");
	};
	const setValue = (value: string) => {
		setSearch(value);
		setText(value);
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
				color={"info"}
				name={"filter-donuts"}
				placeholder={Dictionary.SEARCH_STRING}
				type={TFieldType.text}
				value={text}
				clearable={true}
				onClear={handleClear}
				onChange={handleChange}
				className={"mb-10"}
				size="small"
				sx={{ width: "100%" }}
			/>
			<BntStack direction={"row"} className={"mb-20"} spacing={2}>
				{buttons.map((button) => {
					return (
						<BntRoundButton
							variant="outlined"
							key={button.name}
							onClick={(e: React.SyntheticEvent) => {
								e.preventDefault();
								setSorter(button.sorter);
							}}
							color={"info"}
						>
							{translate(button.name)}
						</BntRoundButton>
					);
				})}
			</BntStack>
		</>
	);
};
