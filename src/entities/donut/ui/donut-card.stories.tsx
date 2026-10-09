import { BonutsSmPng } from "@/shared/ui/icons";

import { DonutCard } from "./donut-card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TDonut } from "@/types/model";

const donut: TDonut = {
	id: 1,
	name: "Coffee with the team",
	description: "Take a break and celebrate a shared win together.",
	price: 25,
	active: true,
	available: true,
	commentable: false,
	comments: [],
	likeable: false,
	likes: [],
	liked: false,
	use_remains: true,
	on_stock: 8,
	logo: {
		url: BonutsSmPng,
		thumb: {
			url: BonutsSmPng,
		},
	},
};

const meta = {
	title: "Entities/Donut/Donut Card",
	component: DonutCard,
	args: {
		donut,
		onClick: () => undefined,
	},
	decorators: [
		(Story) => (
			<div style={{ width: 280 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof DonutCard>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Available: TStory = {};

export const WithoutImage: TStory = {
	args: {
		donut: { ...donut, logo: undefined },
	},
};

export const OutOfStock: TStory = {
	args: {
		donut: { ...donut, on_stock: 0 },
	},
};

export const UnlimitedStock: TStory = {
	args: {
		donut: { ...donut, use_remains: false },
	},
};
