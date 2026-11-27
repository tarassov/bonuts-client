import { ButtonBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const PINNED_STRIP_CLASSES = {
	root: "pinned-strip-root",
	dots: "pinned-strip-dots",
	dot: "pinned-strip-dot",
	dotActive: "pinned-strip-dot-active",
	body: "pinned-strip-body",
	label: "pinned-strip-label",
	preview: "pinned-strip-preview",
	author: "pinned-strip-author",
	date: "pinned-strip-date",
	toggle: "pinned-strip-toggle",
};

const cl = (className: string) => `& .${className}`;

// Sticky wrapper inside the feed scroll area. Collapsed it sticks to the top with an opaque
// backdrop; expanded it joins the feed flow so a long pinned post scrolls with the feed.
export const PinnedArea = styled("div", {
	shouldForwardProp: (prop) => prop !== "isExpanded",
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
	position: isExpanded ? "static" : "sticky",
	top: 0,
	zIndex: 5,
	width: "100%",
	maxWidth: 760,
	margin: theme.spacing(0, "auto", 1.5),
	paddingBottom: isExpanded ? 0 : theme.spacing(1),
	background: isExpanded ? "none" : theme.palette.background.default,
}));

export const PinnedStripRoot = styled("div")(({ theme }) => {
	const isDark = theme.palette.mode === "dark";
	const borderColor = theme.palette.divider;

	return {
		display: "flex",
		alignItems: "stretch",
		overflow: "hidden",
		borderRadius: 14,
		border: `1px solid ${borderColor}`,
		backgroundColor: isDark ? theme.palette.background.paper : theme.palette.common.white,

		[cl(PINNED_STRIP_CLASSES.body)]: {
			flex: 1,
			minWidth: 0,
			display: "flex",
			flexDirection: "column",
			gap: 2,
			padding: theme.spacing(1, 1.5),
			textAlign: "left",
			justifyContent: "center",
			[theme.breakpoints.up("sm")]: {
				flexDirection: "row",
				alignItems: "center",
				gap: theme.spacing(1.5),
			},
		},
		[cl(PINNED_STRIP_CLASSES.dots)]: {
			width: 3,
			margin: theme.spacing(1.25, 0, 1.25, 1.5),
			borderRadius: 2,
			display: "flex",
			flexDirection: "column",
			gap: 3,
			flexShrink: 0,
		},
		[cl(PINNED_STRIP_CLASSES.dot)]: {
			flex: 1,
			borderRadius: 2,
			backgroundColor: theme.palette.primary.light,
			transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shorter }),
		},
		[cl(PINNED_STRIP_CLASSES.dotActive)]: {
			backgroundColor: theme.palette.primary.main,
		},
		[cl(PINNED_STRIP_CLASSES.label)]: {
			display: "inline-flex",
			alignItems: "center",
			gap: 4,
			fontSize: 12,
			fontWeight: 600,
			lineHeight: 1.3,
			whiteSpace: "nowrap",
			color: theme.palette.text.secondary,
			"& svg": { fontSize: 15 },
		},
		[cl(PINNED_STRIP_CLASSES.preview)]: {
			flex: 1,
			minWidth: 0,
			fontSize: 13.5,
			lineHeight: 1.4,
			color: theme.palette.text.primary,
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
			[theme.breakpoints.up("sm")]: { fontSize: 14 },
		},
		[cl(PINNED_STRIP_CLASSES.author)]: {
			fontWeight: 600,
		},
		[cl(PINNED_STRIP_CLASSES.date)]: {
			display: "none",
			fontSize: 12,
			whiteSpace: "nowrap",
			color: theme.palette.text.secondary,
			[theme.breakpoints.up("sm")]: { display: "block" },
		},
		[cl(PINNED_STRIP_CLASSES.toggle)]: {
			width: 44,
			flexShrink: 0,
			borderLeft: `1px solid ${isDark ? theme.palette.divider : alpha(theme.palette.neutral.light, 0.6)}`,
			borderRadius: 0,
			color: theme.palette.text.secondary,
			"&:hover": {
				opacity: 1,
				color: theme.palette.primary.main,
				backgroundColor: alpha(theme.palette.primary.main, 0.06),
			},
		},
	};
});

export const PinnedStripBody = styled(ButtonBase)(({ theme }) => ({
	display: "flex",
	alignItems: "stretch",
	flex: 1,
	minWidth: 0,
	textAlign: "left",
	justifyContent: "flex-start",
	"&.Mui-focusVisible": { outline: `2px solid ${theme.palette.text.secondary}`, outlineOffset: -2 },
}));

export const PinnedPanel = styled("div")(({ theme }) => ({
	padding: theme.spacing(2),
	borderRadius: 16,
	border: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.paper,
	[theme.breakpoints.up("sm")]: { padding: theme.spacing(2, 2.5) },
}));

export const PinnedChip = styled("span")(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	gap: 4,
	minHeight: 24,
	fontSize: 12,
	fontWeight: 600,
	lineHeight: 1,
	whiteSpace: "nowrap",
	color: theme.palette.text.secondary,
	"& svg": { fontSize: 14 },
}));

export const PinnedPanelText = styled("div")(({ theme }) => ({
	marginTop: theme.spacing(1.5),
	fontSize: 14,
	lineHeight: 1.7,
	maxWidth: "62ch",
	whiteSpace: "pre-wrap",
	color: theme.palette.text.primary,
}));

export const PinnedDotButton = styled("button", {
	shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
	width: 8,
	height: 8,
	padding: 0,
	border: "none",
	borderRadius: "50%",
	cursor: "pointer",
	backgroundColor: isActive ? theme.palette.primary.main : theme.palette.primary.light,
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shorter }),
}));

export const PinnedListRow = styled(ButtonBase, {
	shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => {
	const isDark = theme.palette.mode === "dark";

	return {
		width: "100%",
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(1.25),
		padding: theme.spacing(1.25, 1.75),
		borderRadius: 14,
		textAlign: "left",
		border: `1px solid ${isActive ? theme.palette.secondary.veryLight : isDark ? theme.palette.divider : theme.palette.neutral.light}`,
		backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.06) : "transparent",
		transition: theme.transitions.create(["background-color", "border-color"], { duration: theme.transitions.duration.shorter }),
		"&:hover": {
			backgroundColor: alpha(theme.palette.primary.main, 0.06),
		},
	};
});

export const PinnedBadge = styled("span")(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	gap: 4,
	fontSize: 12,
	fontWeight: 600,
	lineHeight: 1,
	color: theme.palette.text.secondary,
	whiteSpace: "nowrap",
	"& svg": { fontSize: 14 },
}));
