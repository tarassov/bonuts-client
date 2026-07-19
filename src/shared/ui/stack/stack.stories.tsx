import { Chip } from "@mui/material";

import { BntStack, BntStackVariant } from "./index";

const meta = {
	title: "Shared/UI/Layout/Stack",
	component: BntStack,
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Default = {
	render: () => (
		<BntStack direction="row" gap={1.5} alignItems="center">
			<Chip label="Recognition" />
			<Chip label="Engagement" />
			<Chip label="Visibility" />
		</BntStack>
	),
};

export const Surface = {
	render: () => (
		<BntStack
			direction={{ xs: "column", sm: "row" }}
			gap={1.5}
			alignItems={{ xs: "stretch", sm: "center" }}
			variant={BntStackVariant.surface}
			sx={{
				p: 1,
				width: "min(640px, calc(100vw - 32px))",
			}}
		>
			<Chip color="primary" label="Give donuts" />
			<Chip label="Search teammates" />
			<Chip label="My activity" />
		</BntStack>
	),
};
