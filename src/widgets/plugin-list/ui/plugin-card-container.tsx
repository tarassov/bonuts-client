import { styled } from "@mui/material/styles";

import { BntCard } from "@/shared/ui/card/card";

export const PluginCardContainer = styled(
	BntCard,
	{}
)(({ theme }) => {
	return {
		"&:hover": {
			cursor: "pointer",
			outline: "2px solid",
			outlineColor: theme.palette.primary.light,
			"& img": {
				transform: "translate3d(0, -3px, 2px)",
				transition: "all 500ms cubic-bezier(0.34, 1.61, 0.7, 1)",
			},
		},
		display: "flex",
		paddingLeft: 12,
		justifyContent: "flex-start",
		alignItems: "center",
		minHeight: 80,
	};
});
