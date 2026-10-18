import { Chip, emphasize } from "@mui/material";
import { styled } from "@mui/material/styles";

import { cl } from "themes/helper";

interface StyledBreadcrumbProps {
	hasLink?: boolean;
}
export const BntStyledBreadcrumb = styled(Chip, {
	shouldForwardProp: (prop) => prop !== "hasLink",
})<StyledBreadcrumbProps>(({ theme, hasLink }) => {
	const isDarkMode = theme.palette.mode === "dark";
	const backgroundColor = isDarkMode ? theme.palette.background.paper : theme.palette.grey[100];

	return {
		maxWidth: "100%",
		backgroundColor,
		height: theme.spacing(3.5),
		borderRadius: "8px",
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightRegular,
		border: `1px solid ${theme.palette.divider}`,
		"& .MuiChip-label": {
			color: theme.palette.text.primary,
		},
		"& .MuiChip-icon": {
			color: theme.palette.text.secondary,
		},
		[cl("MuiBreadcrumbs-li")]: {
			overflow: "hidden !important",
			"& >span": {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				flex: 1,
			},
		},

		"&:hover, &:focus": {
			backgroundColor: hasLink ? emphasize(backgroundColor, isDarkMode ? 0.12 : 0.06) : backgroundColor,
			cursor: hasLink ? "pointer" : "auto",
		},
		"&:active": {
			boxShadow: theme.shadows[1],
			backgroundColor: emphasize(backgroundColor, isDarkMode ? 0.2 : 0.12),
		},
	};
}); // github.com/Microsoft/TypeScript/issues/26591
