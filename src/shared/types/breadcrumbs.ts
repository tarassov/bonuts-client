export type TBntBreadcrumbItem = {
	link?: string;
	onClick?: (item: TBntBreadcrumbItem) => void;
	label: string;
	icon?: JSX.Element;
	key: string;
};

export type TBntBreadcrumb = {
	items: Array<TBntBreadcrumbItem>;
	className?: string;
};
