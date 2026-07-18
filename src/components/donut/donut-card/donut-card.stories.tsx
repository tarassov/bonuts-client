import { BonutsSmPng } from "@/shared/ui/icons";

import { DonutCardStyled } from "./donut-card-styled";
import type { TDonut } from "@/types/model";

const donut: TDonut = {
	id: 1,
	name: "Coffee with the team",
	price: 25,
	active: true,
	commentable: false,
	comments: [],
	likeable: false,
	likes: [],
	liked: false,
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
	component: DonutCardStyled,
	args: {
		donut,
		onDonutClick: () => undefined,
	},
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Available = {};

export const WithoutStock = {
	args: {
		donut: {
			...donut,
			id: 2,
			name: "Recognition lunch",
			on_stock: 0,
		},
	},
};
