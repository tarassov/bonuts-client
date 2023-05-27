import React, { ChangeEvent, FC, useState } from "react";
import { Dictionary, Sorting } from "constants/dictionary";
import { TFieldType } from "shared/form/types/bnt-form";
import { BntTextInput } from "shared/input/text-input";
import { BntStack } from "shared/stack/stack";
import { BntRoundButton } from "shared/buttons/round-button";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TDonut } from "@/types/model";

export const SearchString: FC<{
	setSearch: (search: string) => void;
	// eslint-disable-next-line react/no-unused-prop-types
	setFilter: (filters: Array<{ (a: TDonut): boolean }>) => void;
	setSorter: (sorter: (a: TDonut, b: TDonut) => number) => void;
	buttons: Array<{
		name: Sorting;
		sorter: (a: TDonut, b: TDonut) => number;
	}>;
}> = ({ setSorter, setSearch, buttons }) => {
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

	return (
		<>
			<BntTextInput
				color="primary"
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
							color="primary"
						>
							{translate(button.name)}
						</BntRoundButton>
					);
				})}
			</BntStack>
		</>
	);
};
