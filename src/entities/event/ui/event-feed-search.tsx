import type { ChangeEvent, KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { InputAdornment, Tooltip } from "@mui/material";

import { useDebounceCallback } from "usehooks-ts";

import { FeedSearchButton, FeedSearchInput, FeedSearchRoot } from "./event-feed-search.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_s } from "@/services/localization/texts";

type TEventFeedSearchProps = {
	onSearchTextChange: (search: string) => void;
};

export function EventFeedSearch({ onSearchTextChange }: TEventFeedSearchProps) {
	const { translate } = useBntTranslate();
	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const buttonRef = useRef<HTMLButtonElement>(null);
	const inputId = useId();
	const wasOpen = useRef(false);
	const debouncedSearch = useDebounceCallback(onSearchTextChange, 500);

	useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

	useEffect(() => {
		if (wasOpen.current && !isOpen) buttonRef.current?.focus();
		wasOpen.current = isOpen;
	}, [isOpen]);

	const handleClose = () => {
		debouncedSearch.cancel();
		setSearchText("");
		onSearchTextChange("");
		setIsOpen(false);
	};

	const handleOpen = () => {
		setIsOpen(true);
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
		<FeedSearchRoot data-search-open={isOpen}>
			{isOpen ? (
				<FeedSearchInput
					autoFocus
					id={inputId}
					value={searchText}
					onChange={handleChange}
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
			) : (
				<FeedSearchButton ref={buttonRef} onClick={handleOpen} aria-label={translate(texts_s.search)} aria-expanded={false}>
					<SearchRounded />
				</FeedSearchButton>
			)}
		</FeedSearchRoot>
	);
}
