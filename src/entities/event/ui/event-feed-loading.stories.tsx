import { EventFeedLoading } from "./event-feed-loading";

const meta = {
	title: "Entities/Event/Feed Loading",
	component: EventFeedLoading,
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const Loading = {};

export const Leaving = {
	args: {
		isLeaving: true,
	},
};
