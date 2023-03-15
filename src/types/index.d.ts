type TAuth = {
	token: string | null;
	tenant: string | null;
};

type TRoute = {
	path: string;
	component: JSX.Element;
	anonymous: boolean;
	authenticated: boolean;
	hideInMenu: boolean;
	navbarName?: string;
	redirect?: TRoute;
	modal?: boolean;
	authenticatedRedirect?: TRoute;
	parentRoute?: TRoute;
	icon?: JSX.Element;
	index?: number;
};

type TRedirect = {
	from: TRoute;
	to: TRoute;
	authenticated: boolean;
	attached?: boolean;
};

type BntRoutesMenuProps = {
	showFullName: boolean;
	showTooltip?: boolean;
};

type BntRouteMenuButtonProps = {
	route: TRoute;
	showFullName: boolean;
	showTooltip?: boolean;

	onBeforeClick?: () => { redirect: boolean };
};
