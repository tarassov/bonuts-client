import React, { ChangeEvent, useState } from "react";
import classnames from "classnames";
import { FieldType } from "shared/ui/form/types/bnt-form";
import { useDebounceCallback } from "usehooks-ts";

import { BntRoundButton } from "shared/ui/buttons/round-button";
import { BntTextInput } from "shared/ui/input/text-input";
import { BntStack } from "shared/ui/stack";

import { emptyFunction } from "utils/empty-function";

import { Dictionary } from "constants/dictionary";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TBaseModel } from "@/types/model";
import { TSorterButton } from "@/types/ui/sorter-button";

export type SearchStringProps<T extends TBaseModel = TBaseModel> = {
	setSearch: (search: string) => void;
	// eslint-disable-next-line react/no-unused-prop-types
	setFilter?: (filters: Array<{ (a: T): boolean }>) => void;
	setSorter?: (sorter: (a: T, b: T) => number) => void;
	buttons?: Array<TSorterButton<T>>;
	debounceDelay?: number;
	className?: string;
};

export function SearchString<T extends TBaseModel>(props: SearchStringProps<T>) {
	const { setSorter = emptyFunction, setSearch, buttons, debounceDelay = 0, className } = props;
	const { translate } = useBntTranslate();
	const [text, setText] = useState<string>("");
	const debouncedSetSearch = useDebounceCallback(setSearch, debounceDelay);

	const setValue = (value: string) => {
		setText(value);

		if (debounceDelay) {
			debouncedSetSearch(value);

			return;
		}

		setSearch(value);
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
				placeholder={`${Dictionary.SEARCH_STRING}`}
				type={FieldType.text}
				value={text}
				clearable
				onClear={handleClear}
				onChange={handleChange}
				className={classnames(className, { "mb-3": buttons?.length })}
				size="small"
				sx={{ width: "100%" }}
			/>
			{buttons?.length ? (
				<BntStack direction={{ xs: "column", sm: "row" }} className="mb-5" spacing={{ xs: 1, sm: 2 }}>
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
}
