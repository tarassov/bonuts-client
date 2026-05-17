import { CakeOutlined, Favorite, Visibility } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";

import { BntButton, BntRegularButton, BntRegularSecondaryButton, BntRoundButton, BntTransparentButton } from "@/shared/ui/buttons";
import { BntCard, BntCardActions, BntCardContent, GradientCard } from "@/shared/ui/card";
import { BntTypography } from "@/shared/ui/typography";

const meta = {
	title: "Base UI Kit/Overview",
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const Buttons = {
	render: () => (
		<Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
			<BntButton variant="contained" startIcon={<CakeOutlined />}>
				Give donuts
			</BntButton>
			<BntRegularButton startIcon={<Favorite />}>Recognize</BntRegularButton>
			<BntRegularSecondaryButton startIcon={<Visibility />}>View activity</BntRegularSecondaryButton>
			<BntRoundButton variant="outlined">Status</BntRoundButton>
			<BntTransparentButton>Open profile</BntTransparentButton>
		</Stack>
	),
};

export const CardsAndTypography = {
	render: () => (
		<Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 3, width: "min(760px, 100%)" }}>
			<BntCard raised>
				<BntCardContent>
					<BntTypography variant="h6">Recognition card</BntTypography>
					<BntTypography variant="body2" opacity={0.72}>
						A calm base card for social updates, profile moments, and team appreciation.
					</BntTypography>
				</BntCardContent>
				<BntCardActions>
					<BntButton size="small">Open</BntButton>
				</BntCardActions>
			</BntCard>
			<GradientCard>
				<BntCardContent>
					<BntTypography variant="h6">Warm highlight</BntTypography>
					<BntTypography variant="body2" opacity={0.72}>
						Use sparingly when recognition or status needs a softer visual lift.
					</BntTypography>
				</BntCardContent>
			</GradientCard>
		</Box>
	),
};
