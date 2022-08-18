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
	navbarName: string;
	redirect?: TRoute;
	modal?: boolean;
};

type TRedirect = {
	from: TRoute;
	to: TRoute;
	authenticated: boolean;
	attached?: boolean;
};
