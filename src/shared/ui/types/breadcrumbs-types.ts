export type TBntBreadcrumbItem = {
	link?: string;
	onClick?: (item: TBntBreadcrumbItem) => void;
	label: string;
	icon?: JSX.Element;
	key: string;
	noTranslation?: boolean;
};

export type TBntBreadcrumb = {
	items: Array<TBntBreadcrumbItem>;
	className?: string;
};
