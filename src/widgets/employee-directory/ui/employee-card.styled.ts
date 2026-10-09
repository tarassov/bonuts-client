import { Avatar, Badge } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { BntButton } from "@/shared/ui/buttons";
import { BntCard, BntCardActionArea, BntCardBody } from "@/shared/ui/card";
import { BntTypography } from "@/shared/ui/typography";

export const EmployeeCardRoot = styled(BntCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: 16,
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.palette.mode === "dark" ? "0 8px 24px rgba(0, 0, 0, 0.22)" : "0 8px 24px rgba(30, 31, 37, 0.06)",
	transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
	"&:hover": {
		borderColor: alpha(theme.palette.primary.main, 0.34),
		boxShadow: theme.palette.mode === "dark" ? "0 14px 32px rgba(0, 0, 0, 0.32)" : "0 14px 34px rgba(30, 31, 37, 0.11)",
		transform: "translateY(-2px)",
	},
}));

export const EmployeeCardActionArea = styled(BntCardActionArea)({ display: "flex", flex: "1 1 auto", flexDirection: "column", padding: "26px 20px 0" });
export const EmployeeCardBody = styled(BntCardBody)({ display: "flex", flex: "1 1 auto", flexDirection: "column", alignItems: "center", width: "100%" });

export const EmployeeCardBadge = styled("span", {
	shouldForwardProp: (prop) => prop !== "$tone" && prop !== "isVisible",
})<{ $tone: "primary" | "success"; isVisible: boolean }>(({ $tone, isVisible, theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	height: 24,
	marginBottom: 10,
	padding: "4px 10px",
	borderRadius: 999,
	backgroundColor: $tone === "success" ? alpha(theme.palette.success.main, 0.15) : alpha(theme.palette.primary.main, 0.16),
	color: $tone === "success" ? theme.palette.success.main : theme.palette.primary.main,
	fontSize: 11,
	fontWeight: 700,
	opacity: isVisible ? 1 : 0,
	visibility: isVisible ? "visible" : "hidden",
}));

export const EmployeePresenceBadge = styled(Badge)(({ theme }) => ({
	marginBottom: 20,
	"& .MuiBadge-badge": {
		width: 16,
		minWidth: 16,
		height: 16,
		border: `3px solid ${theme.palette.background.paper}`,
		borderRadius: "50%",
		backgroundColor: theme.palette.success.main,
	},
}));

export const EmployeeCardAvatar = styled(Avatar)(({ theme }) => ({
	width: 140,
	height: 140,
	backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.2),
	color: theme.palette.primary.dark,
	fontSize: 38,
	fontWeight: 700,
}));

export const EmployeeCardCaption = styled("div")({ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", textAlign: "center" });
export const EmployeeName = styled(BntTypography)(({ theme }) => ({ color: theme.palette.text.heading, fontWeight: 700, lineHeight: 1.3 }));
export const EmployeeCardMeta = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: 6,
	minHeight: 20,
	color: theme.palette.text.secondary,
	fontSize: 12.5,
	"& .MuiSvgIcon-root": { fontSize: 17 },
}));
export const EmployeeCardFooter = styled("div")({ width: "100%", padding: "18px 20px 20px" });
export const EmployeeTransferButton = styled(BntButton)(({ theme }) => ({
	width: "100%",
	minHeight: 40,
	borderRadius: 12,
	backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.18),
	color: theme.palette.primary.dark,
	fontWeight: 700,
	textTransform: "none",
	"&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.28) },
	"& .MuiSvgIcon-root": { fontSize: 18 },
}));
