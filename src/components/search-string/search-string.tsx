import React, { ChangeEvent, useState } from "react";
import { Dictionary } from "constants/dictionary";
import { TFieldType } from "shared/form/types/bnt-form";
import { BntStack } from "shared/stack/stack";
import { BntRoundButton } from "shared/buttons/round-button";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTextInput } from "shared/input/text-input";
import { emptyFunction } from "utils/empty-function";
import classnames from "classnames";
import { TBaseModel } from "@/types/model";
import { TSorterButton } from "@/types/ui/sorter-button";

export type SearchStringProps<T extends TBaseModel = TBaseModel> = {
	setSearch: (search: string) => void;
	// eslint-disable-next-line react/no-unused-prop-types
	setFilter?: (filters: Array<{ (a: T): boolean }>) => void;
	setSorter?: (sorter: (a: T, b: T) => number) => void;
	buttons?: Array<TSorterButton<T>>;
};

export const SearchString = <T extends TBaseModel>(props: SearchStringProps<T>) => {
	const { setSorter = emptyFunction, setSearch, buttons } = props;
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
				placeholder={`${translate(Dictionary.SEARCH_STRING)}...`}
				type={TFieldType.text}
				value={text}
				clearable
				onClear={handleClear}
				onChange={handleChange}
				className={classnames({ "mb-3": buttons?.length })}
				size="small"
				sx={{ width: "100%" }}
			/>
			{buttons?.length ? (
				<BntStack
					direction={{ xs: "column", sm: "row" }}
					className="mb-5"
					spacing={{ xs: 1, sm: 2 }}
				>
					{buttons?.map((button) => {
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
			) : null}
		</>
	);
};
