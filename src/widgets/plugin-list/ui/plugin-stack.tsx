import { styled } from "@mui/material/styles";

import { BntStack } from "shared/ui/stack/stack";

export const PluginStack = styled(
	BntStack,
	{}
)(({ theme }) => {
	return {
		maxWidth: 500,
		[theme.breakpoints.down("md")]: {
			maxWidth: "100%",
		},
		gap: 12,
		padding: 24,
	};
});
