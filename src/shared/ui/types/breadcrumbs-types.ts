import type { ReactElement } from "react";

export type TBntBreadcrumbItem = {
	link?: string;
	onClick?: (item: TBntBreadcrumbItem) => void;
	label: string;
	icon?: ReactElement;
	key: string;
	noTranslation?: boolean;
};

export type TBntBreadcrumb = {
	items: Array<TBntBreadcrumbItem>;
	className?: string;
};
