import { Box, Typography } from "@mui/material";

import { BntSurface } from "./bnt-surface";

const meta = {
	title: "Shared/UI/Surface",
	component: BntSurface,
	parameters: { layout: "centered" },
};

export default meta;

export const Default = {
	args: {
		children: (
			<Box sx={{ p: 3, width: 280 }}>
				<Typography fontWeight={700}>Surface title</Typography>
				<Typography color="text.secondary" variant="body2">
					Calm content container
				</Typography>
			</Box>
		),
	},
};

export const Interactive = {
	args: {
		...Default.args,
		isInteractive: true,
	},
};
