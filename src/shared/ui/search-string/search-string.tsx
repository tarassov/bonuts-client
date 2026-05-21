import React, { ChangeEvent, useEffect, useState } from "react";
import { SearchRounded } from "@mui/icons-material";
import type { SxProps, Theme } from "@mui/material";
import { InputAdornment, useMediaQuery, useTheme } from "@mui/material";

import classnames from "classnames";
import { useDebounceCallback } from "usehooks-ts";

import { Dictionary } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { emptyFunction } from "utils/empty-function";

import { BntRoundButton } from "@/shared/ui/buttons";
import { FieldType } from "@/shared/ui/form";
import { BntTextInput } from "@/shared/ui/input";
import { BntStack } from "@/shared/ui/stack";

import type { TBaseModel } from "@/types/model";
import type { TSorterButton } from "@/types/ui/sorter-button";

type TSearchStringVariant = "default" | "surface";

export type SearchStringProps<T extends TBaseModel = TBaseModel> = {
	buttons?: Array<TSorterButton<T>>;
	className?: string;
	debounceDelay?: number;
	inputSx?: SxProps<Theme>;
	mobilePlaceholder?: string;
	name?: string;
	placeholder?: string;
	setFilter?: (filters: Array<{ (a: T): boolean }>) => void;
	setSearch: (search: string) => void;
	setSorter?: (sorter: (a: T, b: T) => number) => void;
	value?: string;
	variant?: TSearchStringVariant;
};

const baseSearchInputSx: SxProps<Theme> = {
	"& .MuiInput-root": {
		"&::before, &::after": {
			display: "none",
		},
		"&:hover:not(.Mui-disabled, .Mui-error):before": {
			display: "none",
		},
	},
	"& .MuiInputBase-root": {
		borderRadius: 2,
		backgroundColor: "background.paper",
		border: "1px solid",
		borderColor: "divider",
		px: 1,
	},
};

const searchInputSxByVariant: Record<TSearchStringVariant, SxProps<Theme>> = {
	default: {
		width: "100%",
		...baseSearchInputSx,
	},
	surface: {
		width: "100%",
		backgroundColor: "background.paper",
		...baseSearchInputSx,
	},
};

export function SearchString<T extends TBaseModel>(props: SearchStringProps<T>) {
	const {
		buttons,
		className,
		debounceDelay = 0,
		inputSx,
		mobilePlaceholder,
		name = "search-string",
		placeholder = Dictionary.SEARCH_STRING,
		setSearch,
		setSorter = emptyFunction,
		value,
		variant = "default",
	} = props;
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [text, setText] = useState<string>(value || "");
	const debouncedSetSearch = useDebounceCallback(setSearch, debounceDelay);
	const resolvedInputSx: SxProps<Theme> = [searchInputSxByVariant[variant], ...(Array.isArray(inputSx) ? inputSx : inputSx ? [inputSx] : [])];
	const resolvedPlaceholder = isMobile && mobilePlaceholder ? mobilePlaceholder : placeholder;

	useEffect(() => {
		if (value === undefined) return;

		setText(value);
	}, [value]);

	const setValue = (nextValue: string) => {
		setText(nextValue);

		if (debounceDelay) {
			debouncedSetSearch(nextValue);

			return;
		}

		setSearch(nextValue);
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
				className={classnames(className, { "mb-3": buttons?.length })}
				clearable
				color="primary"
				name={name}
				onChange={handleChange}
				onClear={handleClear}
				placeholder={resolvedPlaceholder}
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
				sx={resolvedInputSx}
				type={FieldType.text}
				value={text}
			/>
			{buttons?.length ? (
				<BntStack direction={{ xs: "column", sm: "row" }} className="mb-5" spacing={{ xs: 1, sm: 2 }}>
					{buttons.map((button) => {
						return (
							<BntRoundButton
								color="primary"
								key={button.name}
								onClick={(e: React.SyntheticEvent) => {
									e.preventDefault();
									setSorter(button.sorter);
								}}
								variant="outlined"
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
