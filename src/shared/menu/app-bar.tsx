import { styled } from "@mui/material/styles";

import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { DRAWER_WIDTH } from "../../constants/layout";

interface BntAppBarProps extends AppBarProps {
	open?: boolean;
	fullwidth?: boolean;
}

export const BntAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== "open" && prop !== "fullwidth",
})<BntAppBarProps>(({ theme, open, fullwidth }) => {
	return {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.getContrastText(theme.palette.background.default),
		boxShadow: "none",
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open &&
			!fullwidth && {
				marginLeft: DRAWER_WIDTH,
				width: `calc(100% - ${DRAWER_WIDTH}px)`,
				transition: theme.transitions.create(["width", "margin"], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			}),
	};
});
