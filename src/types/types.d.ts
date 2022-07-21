type TRoute = {
	path: string;
	component: JSX.Element;
	anonymous: boolean;
	authenticated: boolean;
	hideInMenu: boolean;
	navbarName: string;
	modal?: boolean;
};

type TRedirect = {
	from: TRoute;
	to: TRoute;
};
