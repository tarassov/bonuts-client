import React, { ChangeEvent, useState } from "react";
import type { SxProps, Theme } from "@mui/material";

import classnames from "classnames";
import { useDebounceCallback } from "usehooks-ts";

import { Dictionary } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntRoundButton } from "shared/ui/buttons/round-button";
import { FieldType } from "shared/ui/form/types/bnt-form";
import { BntTextInput } from "shared/ui/input/text-input";
import { BntStack } from "shared/ui/stack";
import { emptyFunction } from "utils/empty-function";

import { TBaseModel } from "@/types/model";
import { TSorterButton } from "@/types/ui/sorter-button";

type TSearchStringVariant = "default" | "surface";

export type SearchStringProps<T extends TBaseModel = TBaseModel> = {
	setSearch: (search: string) => void;
	setFilter?: (filters: Array<{ (a: T): boolean }>) => void;
	setSorter?: (sorter: (a: T, b: T) => number) => void;
	buttons?: Array<TSorterButton<T>>;
	debounceDelay?: number;
	className?: string;
	inputSx?: SxProps<Theme>;
	variant?: TSearchStringVariant;
};

const searchInputSx: SxProps<Theme> = {
	backgroundColor: "background.paper",
	"& .MuiInputBase-root": {
		borderRadius: 2,
		backgroundColor: "background.paper",
		border: "1px solid",
		borderColor: "neutral.light",
	},
	"& .MuiInput-root": {
		"&::before, &::after": {
			display: "none",
		},
		"&:hover:not(.Mui-disabled, .Mui-error):before": {
			display: "none",
		},
	},
	"& .MuiInputBase-root:hover": {
		borderColor: "primary.main",
	},
	"& .MuiInputBase-root.Mui-focused": {
		borderColor: "primary.main",
	},
};

export function SearchString<T extends TBaseModel>(props: SearchStringProps<T>) {
	const { setSorter = emptyFunction, setSearch, buttons, debounceDelay = 0, className, inputSx } = props;
	const { translate } = useBntTranslate();
	const [text, setText] = useState<string>("");
	const debouncedSetSearch = useDebounceCallback(setSearch, debounceDelay);
	const resolvedInputSx: SxProps<Theme> = [{ width: "100%" }, searchInputSx, ...(Array.isArray(inputSx) ? inputSx : inputSx ? [inputSx] : [])];

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
				sx={resolvedInputSx}
			/>
			{buttons?.length ? (
				<BntStack direction={{ xs: "column", sm: "row" }} className="mb-5" spacing={{ xs: 1, sm: 2 }}>
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
			) : null}
		</>
	);
}
