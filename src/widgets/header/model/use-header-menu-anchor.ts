import type { MouseEvent } from "react";
import { useState } from "react";

type TUseHeaderMenuAnchorResult = {
	anchorEl: HTMLElement | null;
	isMenuOpen: boolean;
	handleMenuOpen: (event: MouseEvent<HTMLElement>) => void;
	handleMenuClose: () => void;
};

export function useHeaderMenuAnchor(): TUseHeaderMenuAnchorResult {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return {
		anchorEl,
		isMenuOpen: Boolean(anchorEl),
		handleMenuOpen,
		handleMenuClose,
	};
}
