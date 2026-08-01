import { Box, Paper, Typography } from "@mui/material";

import { BntCarousel } from "./bnt-carousel";

const items = ["Recognition", "Engagement", "Visibility", "Team spirit"];

const meta = {
	title: "Shared/UI/Carousel/Bnt Carousel",
	component: BntCarousel,
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const Default = {
	render: () => (
		<Box sx={{ width: "min(720px, calc(100vw - 32px))" }}>
			<BntCarousel ariaLabel="Recognition highlights" nextLabel="Next highlight" previousLabel="Previous highlight">
				{items.map((item) => (
					<Paper key={item} sx={{ minHeight: 140, p: 3, borderRadius: 3 }} variant="outlined">
						<Typography fontWeight={700}>{item}</Typography>
						<Typography color="text.secondary" variant="body2">
							A calm, swipeable card for a compact mobile layout.
						</Typography>
					</Paper>
				))}
			</BntCarousel>
		</Box>
	),
};
