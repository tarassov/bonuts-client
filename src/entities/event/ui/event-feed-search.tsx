import type { ChangeEvent, KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { InputAdornment, Tooltip } from "@mui/material";

import { useDebounceCallback } from "usehooks-ts";

import { FeedSearchButton, FeedSearchInput, FeedSearchOpenButton, FeedSearchRoot } from "./event-feed-search.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_s } from "@/services/localization/texts";

type TEventFeedSearchProps = {
	isExpanded: boolean;
	onExpandedChange: (isExpanded: boolean) => void;
	onSearchTextChange: (search: string) => void;
};

export function EventFeedSearch({ isExpanded, onExpandedChange, onSearchTextChange }: TEventFeedSearchProps) {
	const { translate } = useBntTranslate();
	const [searchText, setSearchText] = useState("");
	const buttonRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const inputId = useId();
	const wasExpanded = useRef(false);
	const debouncedSearch = useDebounceCallback(onSearchTextChange, 500);

	useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

	useEffect(() => {
		if (isExpanded) inputRef.current?.focus();
		if (wasExpanded.current && !isExpanded) buttonRef.current?.focus();
		wasExpanded.current = isExpanded;
	}, [isExpanded]);

	const handleClose = () => {
		debouncedSearch.cancel();
		setSearchText("");
		onSearchTextChange("");
		onExpandedChange(false);
	};

	const handleOpen = () => {
		onExpandedChange(true);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchText(value);
		debouncedSearch(value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Escape") {
			event.preventDefault();
			handleClose();
		}
	};

	return (
		<FeedSearchRoot>
			<FeedSearchInput
				isExpanded={isExpanded}
				inputRef={inputRef}
				id={inputId}
				value={searchText}
				onChange={handleChange}
				onFocus={handleOpen}
				onKeyDown={handleKeyDown}
				placeholder={translate(texts_s.search)}
				shouldTranslate={false}
				slotProps={{
					input: {
						disableUnderline: true,
						endAdornment: (
							<InputAdornment position="end">
								<Tooltip title={translate(texts_c.close_search)}>
									<FeedSearchButton onClick={handleClose} aria-label={translate(texts_c.close_search)} sx={{ width: 32, height: 32, borderRadius: 1 }}>
										<CloseRounded fontSize="small" />
									</FeedSearchButton>
								</Tooltip>
							</InputAdornment>
						),
					},
					htmlInput: { "aria-label": translate(texts_s.search) },
				}}
			/>
			<FeedSearchOpenButton isExpanded={isExpanded} ref={buttonRef} onClick={handleOpen} aria-label={translate(texts_s.search)} aria-expanded={isExpanded}>
				<SearchRounded />
			</FeedSearchOpenButton>
		</FeedSearchRoot>
	);
}
