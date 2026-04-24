import { CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";

type TEventCardHeaderProps = {
	notification?: boolean;
	isClickable?: boolean;
};

export const EventCardHeader = styled(CardHeader, {
	shouldForwardProp: (prop) => prop !== "notification" && prop !== "isClickable",
})<TEventCardHeaderProps>(({ theme, notification, isClickable = false }) => {
	const headerPadding = notification ? theme.spacing(1.25, 2, 1) : theme.spacing(2.5, 2.5, 2);
	const avatarMarginRight = notification ? 0 : theme.spacing(1.75);
	const titleFontSize = notification ? theme.typography.body1.fontSize : theme.typography.subtitle1.fontSize;
	const titleFontWeight = notification ? 600 : 700;

	return {
		backgroundColor: notification ? "transparent" : theme.palette.background.paper,
		color: theme.palette.getContrastText(theme.palette.background.default),
		position: "relative",
		padding: headerPadding,
		marginBottom: 0,
		alignItems: "center",
		cursor: isClickable ? "pointer" : "default",

		"& .MuiCardHeader-avatar": {
			marginRight: avatarMarginRight,
		},
		"& .MuiAvatar-root": {
			width: 48,
			height: 48,
		},
		"& .MuiCardHeader-content": {
			minWidth: 0,
		},
		"& .MuiCardHeader-title": {
			fontSize: titleFontSize,
			fontWeight: titleFontWeight,
			lineHeight: 1.25,
		},
		"& .MuiCardHeader-subheader": {
			marginTop: theme.spacing(0.5),
			fontSize: theme.typography.body2.fontSize,
			lineHeight: 1.4,
			color: theme.palette.neutral.dark,
			opacity: 0.72,
		},
		"& .MuiCardHeader-action": {
			marginTop: 0,
			marginRight: 0,
			alignSelf: "center",
			color: theme.palette.neutral.dark,
			opacity: 0.72,
		},
		"&:hover": isClickable
			? {
					backgroundColor: theme.palette.action.hover,
				}
			: undefined,

		"&::after": {
			content: '""',
			position: "absolute",
			bottom: "0",
			height: "1px",
			right: notification ? theme.spacing(2) : theme.spacing(2.5),
			width: notification ? `calc(100% - ${theme.spacing(4)})` : `calc(100% - ${theme.spacing(5)})`,
			backgroundColor: theme.palette.neutral.light,
			display: theme.palette.mode === "dark" ? "none" : "block",
		},
	};
});
