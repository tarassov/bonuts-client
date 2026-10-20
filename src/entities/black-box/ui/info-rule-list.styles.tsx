import { alpha, styled } from "@mui/material/styles";

import { InfoRuleTone } from "../model/info-rule.types";

export const RuleIcon = styled("div", { shouldForwardProp: (prop) => prop !== "tone" })<{ tone: InfoRuleTone }>(({ theme, tone }) => {
	const palette = {
		[InfoRuleTone.Inverse]: { color: theme.palette.inverse.contrastText, background: theme.palette.inverse.main },
		[InfoRuleTone.Brand]: { color: theme.palette.primary.dark, background: alpha(theme.palette.primary.main, 0.14) },
		[InfoRuleTone.Positive]: { color: theme.palette.success.main, background: alpha(theme.palette.success.main, 0.14) },
	}[tone];

	return {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		width: 32,
		height: 32,
		borderRadius: "50%",
		color: palette.color,
		backgroundColor: palette.background,
		"& svg": { fontSize: 18 },
	};
});
