import { Drawer, styled } from "@mui/material";

interface ISidePanelDrawerProps {
	panelWidth: number;
}

/** Temporary side drawer: full-width on phones, a fixed panel from md up. */
export const SidePanelDrawer = styled(Drawer, {
	shouldForwardProp: (prop) => prop !== "panelWidth",
})<ISidePanelDrawerProps>(({ theme, panelWidth }) => ({
	"& .MuiDrawer-paper": {
		width: "100%",
		maxWidth: "100%",
		[theme.breakpoints.up("md")]: {
			width: panelWidth,
		},
	},
}));

export const SidePanelHeader = styled("header")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	padding: theme.spacing(1, 2),
	borderBottom: `1px solid ${theme.palette.divider}`,
	flexShrink: 0,
}));

export const SidePanelBody = styled("div")({
	display: "flex",
	flexDirection: "column",
	flex: "1 1 auto",
	minHeight: 0,
});
