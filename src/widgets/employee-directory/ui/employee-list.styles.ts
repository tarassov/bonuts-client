import { Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const EmployeeSortButton = styled(Button, {
	shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive, theme }) => ({
	minHeight: 34,
	padding: "5px 14px",
	border: `1px solid ${isActive ? "transparent" : theme.palette.divider}`,
	borderRadius: 999,
	backgroundColor: isActive ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.16) : theme.palette.background.paper,
	color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
	fontSize: 13,
	fontWeight: 700,
	lineHeight: 1.2,
	textTransform: "none",
	"&:hover": {
		backgroundColor: alpha(theme.palette.primary.main, isActive ? 0.25 : 0.08),
	},
}));
