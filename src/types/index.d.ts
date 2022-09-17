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
};

type TRedirect = {
	from: TRoute;
	to: TRoute;
	authenticated: boolean;
	attached?: boolean;
};
