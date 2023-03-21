import { MouseEventHandler } from "react";

export type TBntBreadcrumpItem = {
	link?: string;
	onClick?: (item: TBntBreadcrumpItem) => void;
	label: string;
	icon?: JSX.Element;
	key: string;
};

export type TBntBreadcrump = {
	items: Array<TBntBreadcrumpItem>;
	className?: string;
};
