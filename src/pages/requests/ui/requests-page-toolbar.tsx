import type { ChangeEvent, FC, MouseEvent } from "react";
import { useCallback, useState } from "react";
import { CheckRounded, SortRounded } from "@mui/icons-material";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";

import { BntTextInput } from "@/shared/ui/input";
import { SearchString } from "@/shared/ui/search-string";

import { RequestSort } from "../model/request-feed";

import styles from "./requests-page-toolbar.module.scss";
import { Sorting } from "@/constants/dictionary";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_o, texts_s } from "@/services/localization/texts";

type RequestsPageToolbarProps = {
	onSearchChange: (value: string) => void;
	onSortChange: (value: RequestSort) => void;
	searchValue: string;
	sort: RequestSort;
};

export const RequestsPageToolbar: FC<RequestsPageToolbarProps> = ({ onSearchChange, onSortChange, searchValue, sort }) => {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [sortMenuAnchor, setSortMenuAnchor] = useState<HTMLElement | null>(null);
	const isSortMenuOpen = Boolean(sortMenuAnchor);

	const handleSortChange = useCallback(
		(nextSort: RequestSort) => {
			onSortChange(nextSort);
			setSortMenuAnchor(null);
		},
		[onSortChange]
	);

	const handleSortMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
		setSortMenuAnchor(event.currentTarget);
	}, []);

	const handleSortMenuClose = useCallback(() => {
		setSortMenuAnchor(null);
	}, []);

	return (
		<div className={styles.toolbar}>
			<SearchString
				className={styles.searchField}
				inputSx={{
					"& .MuiInput-root": {
						fontSize: { xs: "0.9375rem", sm: undefined },
					},
					"& .MuiInputBase-root": {
						"&:hover": {
							borderColor: "primary.main",
						},
						"&.Mui-focused": {
							borderColor: "primary.main",
						},
					},
				}}
				mobilePlaceholder={texts_s.search}
				name="requests-search"
				placeholder={texts_s.search_by_name_email_or_position}
				setSearch={onSearchChange}
				value={searchValue}
				variant="surface"
			/>

			{isMobile ? (
				<div className={styles.mobileActions}>
					<IconButton
						aria-label={translate(Sorting.NEWEST)}
						className={styles.sortButton}
						onClick={handleSortMenuOpen}
						sx={{
							width: 40,
							height: 40,
							borderRadius: 2,
							border: `1px solid ${theme.palette.divider}`,
							backgroundColor: "background.paper",
							color: sort === RequestSort.Oldest ? "primary.main" : "text.secondary",
						}}
					>
						<SortRounded />
					</IconButton>
					<Menu
						anchorEl={sortMenuAnchor}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						onClose={handleSortMenuClose}
						open={isSortMenuOpen}
						slotProps={{
							paper: {
								sx: {
									mt: 1,
									minWidth: 220,
									borderRadius: 2,
									border: `1px solid ${theme.palette.divider}`,
									boxShadow: theme.palette.mode === "dark" ? "0 14px 34px rgba(0,0,0,0.32)" : "0 14px 34px rgba(30,31,37,0.12)",
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
					>
						<MenuItem onClick={() => handleSortChange(RequestSort.Newest)}>
							<ListItemIcon sx={{ minWidth: 28, color: theme.palette.success.main }}>{sort === RequestSort.Newest ? <CheckRounded fontSize="small" /> : null}</ListItemIcon>
							<ListItemText primary={translate(Sorting.NEWEST)} />
						</MenuItem>
						<MenuItem onClick={() => handleSortChange(RequestSort.Oldest)}>
							<ListItemIcon sx={{ minWidth: 28, color: theme.palette.success.main }}>{sort === RequestSort.Oldest ? <CheckRounded fontSize="small" /> : null}</ListItemIcon>
							<ListItemText primary={translate(texts_o.oldest_first)} />
						</MenuItem>
					</Menu>
				</div>
			) : (
				<BntTextInput
					name="requests-sort"
					onChange={(event: ChangeEvent<HTMLInputElement>) => onSortChange(event.target.value as RequestSort)}
					select
					size="small"
					sx={{
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
							border: `1px solid ${theme.palette.divider}`,
							backgroundColor: "background.paper",
							px: 1,
						},
					}}
					value={sort}
				>
					<MenuItem value={RequestSort.Newest}>{translate(Sorting.NEWEST)}</MenuItem>
					<MenuItem value={RequestSort.Oldest}>{translate(texts_o.oldest_first)}</MenuItem>
				</BntTextInput>
			)}
		</div>
	);
};
