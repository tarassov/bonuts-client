export type TAuthState = {
	token?: string;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	tenant?: string;
	isTenantAuthenticated?: boolean;
};
