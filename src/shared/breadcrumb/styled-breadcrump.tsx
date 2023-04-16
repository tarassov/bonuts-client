import { Chip, emphasize } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledBreadcrumbProps {
	hasLink?: boolean;
}
export const BntStyledBreadcrumb = styled(Chip, {
	shouldForwardProp: (prop) => prop !== "hasLink",
})<StyledBreadcrumbProps>(({ theme, hasLink }) => {
	const backgroundColor =
		theme.palette.mode === "light"
			? theme.palette.grey[100]
			: theme.palette.grey[800];
	return {
		backgroundColor,
		height: theme.spacing(3),
		color: theme.palette.info.main,
		fontWeight: theme.typography.fontWeightRegular,
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
