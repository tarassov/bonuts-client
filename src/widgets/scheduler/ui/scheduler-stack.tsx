import { styled } from "@mui/material/styles";

import { BntStack } from "shared/ui/stack/stack";

export const SchedulerStack = styled(
	BntStack,
	{}
)(() => {
	return {
		maxWidth: 700,
		paddingTop: 8,
		paddingRight: 4,
		paddingLeft: 8,
		paddingBottom: 24,
	};
});
