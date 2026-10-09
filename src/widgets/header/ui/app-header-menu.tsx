import Menu from "@mui/material/Menu";
import { styled } from "@mui/material/styles";

export const AppHeaderMenu = styled(Menu)(({ theme }) => ({
	"& .MuiPaper-root": {
		overflowY: "auto",
		overflowX: "hidden",
		maxHeight: "calc(100dvh - 24px)",
		filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
		marginTop: theme.spacing(1.5),
		overscrollBehavior: "contain",
		WebkitOverflowScrolling: "touch",
		scrollbarWidth: "none",
		msOverflowStyle: "none",
		"&::-webkit-scrollbar": {
			display: "none",
		},
		"& .MuiAvatar-root": {
			width: 32,
			height: 32,
			marginLeft: theme.spacing(-0.5),
			marginRight: theme.spacing(1),
		},
		"&:before": {
			content: '""',
			display: "block",
			position: "absolute",
			top: 4,
			right: 14,
			width: 10,
			height: 10,
			backgroundColor: theme.palette.background.paper,
			transform: "rotate(45deg)",
			zIndex: 0,
		},
	},
}));
