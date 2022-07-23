import DashboardPage from "../pages/dashboard-page/dashboard-page";
import HomePage from "../pages/home-page/home-page";
import LoginPage from "../pages/login-page/login-page";

export const homeRoute: TRoute = {
	path: "/home",
	anonymous: true,
	authenticated: false,
	navbarName: "Home",
	hideInMenu: true,
	component: <HomePage />,
};

export const loginRoute: TRoute = {
	path: "/login",
	anonymous: true,
	authenticated: false,
	navbarName: "Login",
	hideInMenu: true,
	component: <LoginPage />,
};

export const dashBoardRoute: TRoute = {
	path: "/dashboard",
	anonymous: false,
	authenticated: true,
	navbarName: "Dashboard",
	hideInMenu: false,
	component: <DashboardPage />,
};
