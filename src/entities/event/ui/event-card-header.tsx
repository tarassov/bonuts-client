import { CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";

export const EventCardHeader = styled(
	CardHeader,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.getContrastText(theme.palette.background.default),
		position: "relative",
		paddingBottom: "15px",
		marginBottom: "5px",

		"&::after": {
			content: '""',
			position: "absolute",
			bottom: "0",
			height: "1px",
			right: "15px",
			width: "calc(100% - 30px)",
			backgroundColor: theme.palette.neutral.main,
		},
	};
});
