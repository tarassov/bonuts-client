import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { ArchiveOutlined, ForwardToInboxOutlined, InboxOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

import { BntBreadcrumbs } from "./breadcrumbs";

const meta = {
	title: "Shared UI/Navigation/Breadcrumbs",
	component: BntBreadcrumbs,
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story: () => ReactElement) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
};

export default meta;

export const RequestsFlow = {
	render: () => (
		<Box sx={{ width: "min(720px, calc(100vw - 32px))" }}>
			<BntBreadcrumbs
				items={[
					{
						icon: <ForwardToInboxOutlined />,
						key: "requests",
						label: "Requests",
						link: "/requests",
						noTranslation: true,
					},
					{
						icon: <InboxOutlined />,
						key: "active",
						label: "Active",
						noTranslation: true,
					},
				]}
			/>
		</Box>
	),
};

export const ArchiveState = {
	render: () => (
		<Box sx={{ width: "min(720px, calc(100vw - 32px))" }}>
			<BntBreadcrumbs
				items={[
					{
						icon: <ForwardToInboxOutlined />,
						key: "requests",
						label: "Requests",
						link: "/requests",
						noTranslation: true,
					},
					{
						icon: <ArchiveOutlined />,
						key: "closed",
						label: "Closed",
						noTranslation: true,
					},
				]}
			/>
		</Box>
	),
};
