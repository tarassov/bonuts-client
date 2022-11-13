import { styled } from "@mui/material/styles";

import AppBar, { AppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;

interface BNTAppBarProps extends AppBarProps {
	open?: boolean;
}

export const BNTAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<BNTAppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	backgroundColor: theme.palette.background.default,
	color: theme.palette.getContrastText(theme.palette.background.default),
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));
