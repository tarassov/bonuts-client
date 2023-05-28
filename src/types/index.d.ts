type TAuth = {
	token?: string;
	tenant?: string;
};

type TRoute<T> = {
	path: string;
	component: JSX.Element;
	anonymous: boolean;
	authenticated: boolean;
	hideInMenu: boolean;
	navbarName?: string;
	redirect?: string;
	modal?: boolean;
	authenticatedRedirect?: string;
	parentRoute?: TRoute;
	icon?: JSX.Element;
	index?: number;
	children?: { [name in T]?: TRoute };
};

type TRedirect = {
	from: string;
	to: string;
	authenticated: boolean;
	attached?: boolean;
};

type RedirectConfig = {
	redirects: Array<TRedirect>;
};

type TRouteConfig<T> = {
	routes: Partial<Record<T, TRoute<T>>>;
	redirects: RedirectConfig;
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
