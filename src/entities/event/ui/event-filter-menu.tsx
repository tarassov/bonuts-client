import type { MouseEvent } from "react";
import { useState } from "react";
import { CheckRounded, FilterListRounded } from "@mui/icons-material";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_s } from "services/localization/texts";

type TEventFilterMenuProps = {
	showMine: boolean;
	onShowMineToggle: VoidFunction;
};

export function EventFilterMenu({ showMine, onShowMineToggle }: TEventFilterMenuProps) {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleShowMineClick = () => {
		onShowMineToggle();
	};

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					alignSelf: { xs: "flex-end", sm: "center" },
					width: 40,
					height: 40,
					border: `1px solid ${showMine ? theme.palette.primary.main : theme.palette.neutral.light}`,
					color: showMine ? theme.palette.primary.main : theme.palette.neutral.dark,
					backgroundColor: showMine ? theme.palette.primary.light : theme.palette.common.white,
					"&:hover": {
						border: `1px solid ${theme.palette.primary.main}`,
						backgroundColor: theme.palette.primary.light,
					},
				}}
				aria-label={translate(texts_s.show_only_mine)}
			>
				<FilterListRounded />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={isOpen}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				slotProps={{
					paper: {
						sx: {
							mt: 1,
							minWidth: 220,
							borderRadius: 2,
							border: `1px solid ${theme.palette.neutral.light}`,
							boxShadow: "0 14px 34px rgba(30,31,37,0.12)",
						},
					},
				}}
			>
				<MenuItem onClick={handleShowMineClick}>
					<ListItemIcon sx={{ minWidth: 28, color: theme.palette.success.main }}>{showMine ? <CheckRounded fontSize="small" /> : null}</ListItemIcon>
					<ListItemText primary={translate(texts_s.show_only_mine)} />
				</MenuItem>
			</Menu>
		</>
	);
}
