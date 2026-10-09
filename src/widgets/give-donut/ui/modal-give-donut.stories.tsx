import { Paper } from "@mui/material";

import { DefaultProfilePng } from "@/shared/ui/icons";

import type { TSelectedEmployee } from "../model/modal-give-donut-model";

import { ModalGiveDonutSearchStep } from "./modal-give-donut-search-step";
import { ModalGiveDonutSuccessStep } from "./modal-give-donut-success-step";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TProfile } from "@/types/model";

const colleagues: Array<TProfile> = [
	{
		id: 1,
		name: "Anna Petrova",
		user_name: "Anna Petrova",
		position: "People Partner",
		user_avatar: {
			url: DefaultProfilePng,
			thumb: {
				url: DefaultProfilePng,
			},
		},
	},
	{
		id: 2,
		name: "Mikhail Orlov",
		user_name: "Mikhail Orlov",
		position: "Frontend Developer",
		user_avatar: {
			url: DefaultProfilePng,
			thumb: {
				url: DefaultProfilePng,
			},
		},
	},
	{
		id: 3,
		name: "Ekaterina Smirnova-Romanova",
		user_name: "Ekaterina Smirnova-Romanova",
		position: "Customer Success Lead",
	},
];

const handleEmployeeSelect = (_employee: TSelectedEmployee) => undefined;

const handleQueryChange = (_query: string) => undefined;

const handleClose = () => undefined;

const meta = {
	title: "Widgets/Give Donut/Modal Give Donut",
	component: ModalGiveDonutSearchStep,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<Paper
				elevation={3}
				sx={{
					p: 3,
					width: { xs: 320, sm: 450 },
				}}
			>
				<Story />
			</Paper>
		),
	],
	args: {
		colleagues,
		isLoading: false,
		query: "",
		onEmployeeSelect: handleEmployeeSelect,
		onQueryChange: handleQueryChange,
	},
} satisfies Meta<typeof ModalGiveDonutSearchStep>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Search: TStory = {};

export const Loading: TStory = {
	args: {
		isLoading: true,
	},
};

export const EmptyResult: TStory = {
	args: {
		colleagues: [],
		query: "No match",
	},
};

export const Success: TStory = {
	render: () => <ModalGiveDonutSuccessStep onClose={handleClose} />,
};
