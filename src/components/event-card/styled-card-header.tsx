import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BNTEventCard } from "./event-card";
import { DRAWER_WIDTH } from "../../constants/layout";
import { CardHeader, darken } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export const BNTStyledCardHeader = styled(
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
