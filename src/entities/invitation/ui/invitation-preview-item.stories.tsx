import { InvitationPreviewItem } from "./invitation-preview-item";

const meta = {
	title: "Entities/Invitation/Preview Item",
	component: InvitationPreviewItem,
	args: {
		actionLabel: "Accept",
		dateLabel: "26 May 2026",
		logoAlt: "Bonuts team",
		logoContent: "BN",
		metaLines: ["Bonuts Team", "Invited by Alex Petrov"],
		onAction: () => undefined,
		onSecondaryAction: () => undefined,
		secondaryActionLabel: "View",
		title: "Bonuts",
	},
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const Default = {};

export const WithImage = {
	args: {
		logoContent: (
			<img
				alt="Bonuts team"
				src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='24' fill='%23F59E0B'/%3E%3Ctext x='60' y='70' text-anchor='middle' font-family='Arial' font-size='42' fill='white'%3EBN%3C/text%3E%3C/svg%3E"
			/>
		),
	},
};
