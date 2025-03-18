import { styled } from "@mui/material/styles";

import { BntStack } from "shared/ui/stack/stack";

export const PluginStack = styled(
	BntStack,
	{}
)(() => {
	return {
		maxWidth: 300,
		paddingTop: 8,
		paddingRight: 4,
		paddingLeft: 8,
		paddingBottom: 24,
	};
});
