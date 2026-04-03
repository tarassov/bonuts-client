import { CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";

type TEventCardHeaderProps = {
	notification?: boolean;
};

export const EventCardHeader = styled(CardHeader, {
	shouldForwardProp: (prop) => prop !== "notification",
})<TEventCardHeaderProps>(({ theme, notification }) => {
	return {
		backgroundColor: notification ? "transparent" : theme.palette.background.paper,
		color: theme.palette.getContrastText(theme.palette.background.default),
		position: "relative",
		padding: theme.spacing(2.5, 2.5, 2),
		marginBottom: 0,
		alignItems: "flex-start",

		"& .MuiCardHeader-avatar": {
			marginRight: theme.spacing(1.75),
		},
		"& .MuiAvatar-root": {
			width: 48,
			height: 48,
		},
		"& .MuiCardHeader-content": {
			minWidth: 0,
		},
		"& .MuiCardHeader-title": {
			fontSize: theme.typography.subtitle1.fontSize,
			fontWeight: 700,
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

		"&::after": {
			content: '""',
			position: "absolute",
			bottom: "0",
			height: "1px",
			right: theme.spacing(2.5),
			width: `calc(100% - ${theme.spacing(5)})`,
			backgroundColor: theme.palette.neutral.light,
		},
	};
});
