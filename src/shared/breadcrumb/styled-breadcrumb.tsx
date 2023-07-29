import { Chip, emphasize } from "@mui/material";
import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";

interface StyledBreadcrumbProps {
	hasLink?: boolean;
}
export const BntStyledBreadcrumb = styled(Chip, {
	shouldForwardProp: (prop) => prop !== "hasLink",
})<StyledBreadcrumbProps>(({ theme, hasLink }) => {
	const backgroundColor =
		theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800];
	return {
		maxWidth: "100%",
		backgroundColor,
		height: theme.spacing(3),
		color: theme.palette.grey["800"],
		fontWeight: theme.typography.fontWeightRegular,
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
			backgroundColor: hasLink && emphasize(backgroundColor, 0.06),
			cursor: hasLink ? "pointer" : "auto",
		},
		"&:active": {
			boxShadow: theme.shadows[1],
			backgroundColor: emphasize(backgroundColor, 0.12),
		},
	};
}); // github.com/Microsoft/TypeScript/issues/26591
