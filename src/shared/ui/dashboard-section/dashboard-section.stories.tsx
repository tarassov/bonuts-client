import { AddOutlined, DeleteOutline, EmailOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { BntButton, BntRegularButton } from "@/shared/ui/buttons";

import { DashboardSection, DashboardSectionMedia, DashboardSectionVariant } from "./dashboard-section";

const meta = {
	title: "Shared/UI/Dashboard Section",
	component: DashboardSection,
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const Default = {
	render: () => (
		<DashboardSection
			action={
				<BntButton disabled noTransform startIcon={<EmailOutlined />} variant="outlined">
					Change email
				</BntButton>
			}
			media={<DashboardSectionMedia>AP</DashboardSectionMedia>}
		>
			<Stack spacing={0.75}>
				<strong>Your account</strong>
				<span>alex@example.com</span>
				<span>Used for sign in and notifications</span>
			</Stack>
		</DashboardSection>
	),
};

export const Warm = {
	render: () => (
		<DashboardSection
			action={
				<BntRegularButton noTransform variant="contained">
					Create your team
				</BntRegularButton>
			}
			media={
				<DashboardSectionMedia variant={DashboardSectionVariant.Warm}>
					<AddOutlined />
				</DashboardSectionMedia>
			}
			variant={DashboardSectionVariant.Warm}
		>
			<Stack spacing={0.75}>
				<strong>Create your team</strong>
				<span>If you do not have a team yet, you can send a request to create one.</span>
			</Stack>
		</DashboardSection>
	),
};

export const Danger = {
	render: () => (
		<DashboardSection
			action={
				<BntButton color="error" noTransform variant="outlined">
					Delete profile
				</BntButton>
			}
			media={
				<DashboardSectionMedia variant={DashboardSectionVariant.Danger}>
					<DeleteOutline />
				</DashboardSectionMedia>
			}
			variant={DashboardSectionVariant.Danger}
		>
			<Stack spacing={0.75}>
				<strong>Danger zone</strong>
				<span>Deleting your profile will revoke access to all data.</span>
			</Stack>
		</DashboardSection>
	),
};
