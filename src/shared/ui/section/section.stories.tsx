import { BntTypography } from "@/shared/ui/typography";

import { BntSection, BntSectionHeader } from "./section";

const meta = {
	title: "Shared/UI/Section/Semantic Section",
	component: BntSection,
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Default = {
	render: () => (
		<BntSection aria-labelledby="section-story-title" style={{ maxWidth: 440, padding: 16, border: "1px solid", borderRadius: 12 }}>
			<BntSectionHeader>
				<BntTypography as="h2" id="section-story-title" variant="h6">
					Recognition activity
				</BntTypography>
			</BntSectionHeader>
			<BntTypography color="text.secondary" sx={{ mt: 1 }}>
				A semantic wrapper for a standalone area of page content.
			</BntTypography>
		</BntSection>
	),
};
